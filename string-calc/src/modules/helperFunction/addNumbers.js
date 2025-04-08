export default function addNumbers(nums) {
    let totalNum;
    try {
        let negativeNumber = nums.filter(num => (num != '' && num < 0));
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
                return (parseInt(num) > 1000) ? acc : acc + (parseInt(num) || 0);
            }, 0);
        }

    } catch (e) {
        return {
            result: null,
            error: true,
            errorMsg: e.errorMsg
        }
    }
    return { result: totalNum, error: false };
}