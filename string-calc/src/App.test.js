import { fireEvent, render, screen } from "@testing-library/react";
import { stringCalc } from "./modules/stringCalc";
import App from "./App";

describe('Test for the stringCalculator add function', () => {
  test('returns 0 for an empty string', () => {
    expect(stringCalc("")).toBe(0);
  });
  test('returns the same number when one number is provided', () => {
    expect(stringCalc("1")).toBe(1);
  });
  test('returns the sum when two numbers are provided', () => {
    expect(stringCalc("1,2")).toBe(3);
  });
  test('returns the sum when two numbers are provided', () => {
    expect(stringCalc("1,2")).toBe(3);
  });
});

describe('Test for the stringCalculator add function from UI', () => {
  test("test empty input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter numbers (comma separated)');
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByText('Click To get Result');
    fireEvent.click(button);

    const result = screen.getByText('Result: 0');
    expect(result).toBeInTheDocument();
  })
  test('returns the same number when one number is provided', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '1' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    const result = screen.getByText(/Result: 1/i);
    expect(result).toBeInTheDocument();
  });
  test('returns the same number when one number is provided', () => {
    render(<App />);
    let input = screen.getByTitle(/enter value/i);
    fireEvent.change(input, { target: { value: '1,2' } });
    let btn = screen.getByText(/Click to get Result/i);
    fireEvent.click(btn);
    const result = screen.getByText(/Result: 3/i);
    expect(result).toBeInTheDocument();
  });

});