import React, { useState } from 'react'
import { performCalculation } from '../modules/stringCalc'
export default function CalcForm() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    const handleClick = () => {
        let res = performCalculation(input);
        if (res.errorMsg) {
            setError(res.errorMsg);
            setCount(res.calledCount);
        } else {
            setResult(res.result);
            setCount(res.calledCount);
        }

    };
    return (
        <div className='calcContainer'>
            <div className='inputContainer'>
                <label htmlFor='input'>Enter Value To Be Calc: </label>
                <input id='input' title='enter value' placeholder="Enter numbers (comma separated)" className='input' type='text' pattern='' value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={() => { handleClick() }}>Click To get Result</button>
            <div className='inputContainer flexcontainer'>
                {!error ? <div className="results">Result: {result}</div> : <div className="error">Error: {error}</div>}
                <div className='countDiv'>No Of Called Function: {count}</div>
            </div>
        </div>
    )
}
