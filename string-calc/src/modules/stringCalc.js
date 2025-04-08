export function stringCalc(strnum) {
    //case1: return 0 when there is no input present
    if (!strnum) {
        return { result: 0, error: false };
    }
    // Case 2: Handle custom delimiter syntax (//[delimiter]\n[numbers...])
    if (strnum.startsWith('//')) {
        let delimiterEndIndex;
        if (strnum.indexOf("\\n") !== -1) {
            delimiterEndIndex = strnum.indexOf('\\n');
        } else {
            delimiterEndIndex = strnum.indexOf('\n');
        }
        const delimiter = strnum.substring(2, delimiterEndIndex); // Get the custom delimiter
        const numberString = strnum.substring(delimiterEndIndex + 2);
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
                errorMsg: `negatives not allowed and the negative that was passed: ${negativeNumber.join(',')}`
            }
        } else {
            totalNum = nums.reduce((acc, num) => {
                if (num !== '' && !parseInt(num)) {
                    throw new Error(`Invalid number: ${num}`);
                }
                return acc + parseInt(num || 0)
            }, 0);
        }

    } catch (e) {
        return {
            result: null,
            error: true,
            errorMsg: e
        }
    }
    return { result: totalNum, error: false };
}