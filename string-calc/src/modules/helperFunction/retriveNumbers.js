export default function retriveNumsFromStr(strnum) {
    let delimitors = strnum.match(/\[([^\]]+)\]/g) || [];
    let delimiterEndIndex, numberString;
    if (strnum.startsWith('//')) {
        delimitors.forEach(delimitor => {
            let delimitorStr = delimitor.replaceAll(/[\[\]]/g, '');
            strnum = strnum.replaceAll(delimitorStr, ",");
        });
        if (strnum.indexOf("\\n") !== -1) {
            delimiterEndIndex = strnum.indexOf('\\n');
            numberString = strnum.substring(delimiterEndIndex + 2);
        } else {
            delimiterEndIndex = strnum.indexOf('\n');
            numberString = strnum.substring(delimiterEndIndex + 1);
        }
    } else {
        numberString = strnum;
    }
    const numArray = numberString.split(/[\n,]+/);
    return numArray;
}