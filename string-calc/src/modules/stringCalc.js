
function functionCalledWrapper() {
    let count = 0;
    function addNum(strnum) {
        //case1: return 0 when there is no input present
        count += 1;
        if (!strnum) {
            return { result: 0, error: false, calledCount: count };
        }
        // Case 2: Handle custom delimiter syntax (//[delimiter]\n[numbers...])
        if (strnum.startsWith('//')) {
            let delimiterEndIndex, numberString;
            if (strnum.indexOf("\\n") !== -1) {
                delimiterEndIndex = strnum.indexOf('\\n');
                numberString = strnum.substring(delimiterEndIndex + 2);
            } else {
                delimiterEndIndex = strnum.indexOf('\n');
                numberString = strnum.substring(delimiterEndIndex + 1);
            }
            const delimiter = strnum.substring(2, delimiterEndIndex); // Get the custom delimiter
            // Split numbers based on the custom delimiter
            const numArray = numberString.split(delimiter);
            return sumNumbers(numArray);
        }
        // Case 3: Handle default comma and newline-separated numbers
        const numArray = strnum.split(/[\n,]+/); // Split by commas or newlines
        return sumNumbers(numArray);
    }
    function sumNumbers(nums) {
        let totalNum;
        try {
            let negativeNumber = nums.filter(num => (num != '' && num < 0));
            debugger;
            if (negativeNumber.length) {
                return {
                    error: true,
                    result: null,
                    errorMsg: `negatives not allowed and the negative that was passed: ${negativeNumber.join(',')}`, calledCount: count
                }
            } else {
                totalNum = nums.reduce((acc, num) => {
                    if (num !== '' && !parseInt(num)) {
                        throw new Error(`Invalid number: ${num}`);
                    }
                    return (parseInt(num) > 1000) ? acc : acc + (parseInt(num) || 0);
                }, 0);
            }

        } catch (e) {
            return {
                result: null,
                error: true,
                errorMsg: e.errorMsg, calledCount: count
            }
        }
        return { result: totalNum, error: false, calledCount: count };
    }
    function getCount() {
        return count;
    }
    return { addNum: addNum, getCount: getCount }
}
let funcWrapper = functionCalledWrapper();
export const stringCalc = funcWrapper.addNum;
export const getCount = funcWrapper.getCount;
