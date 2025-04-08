import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { stringCalc, getCount } from "./modules/stringCalc";
import App from "./App";

describe('Test for the stringCalculator add function', () => {
  test('returns 0 for an empty string like: ""', () => {
    expect(stringCalc("").result).toBe(0);
  });
  test('returns the same number when one number is provided like: "1"', () => {
    expect(stringCalc("1").result).toBe(1);
  });
  test('returns the sum of two number when two numbers are provided like: "1,2"', () => {
    expect(stringCalc("1,2").result).toBe(3);
  });
  test('returns the total number after addition of numbers passsed in str with delimitor like: "//;\\n1;2;3"', () => {
    expect(stringCalc("//;\\n1;2;3").result).toBe(6);
  });
  test('returns total after avoiding negative numbers passed in str with delimitor like: "//;\n1;2;3;4;-43;-2;43;65;"', () => {
    expect(stringCalc("//;\n1;2;3;4;-43;-2;43;65;").errorMsg).toBe('negatives not allowed and the negative that was passed: -43,-2');
  });
  test('returns total after avoiding number greater than 1000 numbers passed in str with delimitor like: "//;\n1;2;1004;5;10001;1000"', () => {
    expect(stringCalc("//;\n1;2;1004;5;10001;1000").result).toBe(1008);
  });

  describe("return total num different delimiter length", () => {
    test('return total of number passed in str with dynamic length of delimitor with length 3 like: "//***\n1***2***3"', () => {
      expect(stringCalc("//***\n1***2***3").result).toBe(6);
    });
    test('return total of number passed in str with dynamic length of delimitor with length 5 like: "//***\n1***2***3"', () => {
      expect(stringCalc("//abcde\n1abcde2abcde10").result).toBe(13);
    });
  })

  afterAll(() => {
    expect(getCount()).toBe(8);
  });
});

describe('Test the stringCalculator add function same behaviour from the UI', () => {
  test("test empty input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers (comma separated)');
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByText('Click To get Result');
    fireEvent.click(button);

    const result = screen.getByText('Result: 0');
    expect(result).toBeInTheDocument();
  })
  test('returns the same number when one number is provided like: "1"', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '1' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    const result = screen.getByText(/Result: 1/i);
    expect(result).toBeInTheDocument();
  });
  test('returns the sum of two number when two numbers are provided like: "1,2"', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '1,2' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    const result = screen.getByText(/Result: 3/i);
    expect(result).toBeInTheDocument();
  });
  test('returns the total number after addition of numbers passsed in str with delimitor like: "//;\\n1;2;3"', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '//;\\n1;2;3' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    const result = screen.getByText(/Result: 6/i);
    expect(result).toBeInTheDocument();
  });

  test('returns total after avoiding negative numbers passed in str with delimitor like: "//;\n1;2;3;4;-43;-2;43;65;"', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '//;\n1;2;3;4;-43;-2;43;65;' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    setTimeout(() => {
      const result = screen.getByText(/Error: negatives not allowed and the negative that was passed: -43,-2/i);
      expect(result).toBeInTheDocument();
    }, 500);
  });
  test('returns total after avoiding number greater than 1000 numbers passed in str with delimitor like: "//;\n1;2;1004;5;10001;1000"', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '//;\n1;2;3;4;-43;-2;43;65;' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    setTimeout(() => {
      const result = screen.getByText(/Result: 1008/i);
      expect(result).toBeInTheDocument();
    }, 500);
  });
  describe("return total num different delimiter length", () => {
    test('return total of number passed in str with dynamic length of delimitor with length 3 like: "//***\n1***2***3"', () => {
      render(<App />);
      let input = screen.getByTitle(/enter value/i);
      fireEvent.change(input, { target: { value: '//***\n1***2***3' } });
      let btn = screen.getByText(/Click to get Result/i);
      fireEvent.click(btn);
      setTimeout(() => {
        const result = screen.getByText(/Result: 6/i);
        expect(result).toBeInTheDocument();
      }, 500);
    });
    test('return total of number passed in str with dynamic length of delimitor with length 5 like: "//***\n1***2***3"', () => {
      render(<App />);
      let input = screen.getByTitle(/enter value/i);
      fireEvent.change(input, { target: { value: '//abcde\n1abcde2abcde10' } });
      let btn = screen.getByText(/Click to get Result/i);
      fireEvent.click(btn);
      setTimeout(() => {
        const result = screen.getByText(/Result: 13/i);
        expect(result).toBeInTheDocument();
      }, 500);
    });
  })
  afterAll(() => {
    expect(getCount()).toBe(16);
  });
});
