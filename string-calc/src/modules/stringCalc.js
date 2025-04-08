export function stringCalc(strnum) {
    //case1: return 0 when there is no input present
    if (!strnum) {
        return 0;
    }
    //case 2: number present like 1,2,3 will give total of this number as mentioned "1,2" == 3
    let numsArr = strnum.split(",");
    let totalNum = numsArr.reduce((acc, num) => { return acc + parseInt(num || 0) }, 0);
    return totalNum;
}