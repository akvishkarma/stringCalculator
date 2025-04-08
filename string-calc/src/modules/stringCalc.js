import addNumbers from "./helperFunction/addNumbers";
import retriveNumsFromStr from "./helperFunction/retriveNumbers";

function makeClosure() {
    let count = 0;
    function performCalculation(strnum) {
        count += 1;
        if (!strnum) {
            return { result: 0, error: false, calledCount: count };
        }
        let numArray = retriveNumsFromStr(strnum);
        return addNumbers(numArray);
    }
    function getFunCalledCount() {
        return count;
    }
    return { performCalculation: performCalculation, getFunCalledCount: getFunCalledCount }
}
let funcWrapper = makeClosure();
export const performCalculation = funcWrapper.performCalculation;
export const getCount = funcWrapper.getFunCalledCount;
