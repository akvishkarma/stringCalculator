
import { performCalculation, getCount } from "./modules/stringCalc";

describe('Test for the stringCalculator add function', () => {
  test('returns 0 for an empty string like: ""', () => {
    expect(performCalculation("").result).toBe(0);
  });
  test('returns the same number when one number is provided like: "1"', () => {
    expect(performCalculation("1").result).toBe(1);
  });
  test('returns the sum of two number when two numbers are provided like: "1,2"', () => {
    expect(performCalculation("1,2").result).toBe(3);
  });
  test('returns the total number after addition of numbers passsed in str with delimitor like: "//[;]\\n1;2;3"', () => {
    expect(performCalculation("//[;]\\n1;2;3").result).toBe(6);
  });
  test('returns total after avoiding negative numbers passed in str with delimitor like: "//[;]\n1;2;3;4;-43;-2;43;65;"', () => {
    expect(performCalculation("//[;]\n1;2;3;4;-43;-2;43;65;").errorMsg).toBe('negatives not allowed and the negative that was passed: -43,-2');
  });
  test('returns total after avoiding number greater than 1000 numbers passed in str with delimitor like: "//[];]\n1;2;1004;5;10001;1000"', () => {
    expect(performCalculation("//[;]\n1;2;1004;5;10001;1000").result).toBe(1008);
  });

  describe("return total num with different delimiter length", () => {
    test('return total of number passed in str with dynamic length of delimitor with length 3 like: "//[***]\n1***2***3"', () => {
      expect(performCalculation("//[***]\n1***2***3").result).toBe(6);
    });
    test('return total of number passed in str with dynamic length of delimitor with length 5 like: "//[***]\n1***2***3"', () => {
      expect(performCalculation("//[abcde]\n1abcde2abcde10").result).toBe(13);
    });
  })
  describe("return total num with multiples delimiter", () => {
    test('return total of number passed in str with multiple delimitor and has dynamic length 3 like: "//***\n1***2***3"', () => {
      expect(performCalculation("//[*][%]\n1*2%3").result).toBe(6);
    });
    test('return total of number passed in str with multiple delimitor and has dynamic length  5 like: "//***\n1***2***3"', () => {
      expect(performCalculation("//[**][%%]\n1**2%%3").result).toBe(6);
    });
  });
  afterAll(() => {
    expect(getCount()).toBe(10);
  });
});

