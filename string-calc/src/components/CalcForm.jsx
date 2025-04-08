import React, { useState } from 'react'
import { stringCalc } from '../modules/stringCalc'
export default function CalcForm() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);
    const [error, setError] = useState(false);
    const handleClick = () => {
        let res = stringCalc(input);
        if (res.errorMsg) {
            setError(res.errorMsg);
        } else {
            setResult(res.result);
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
                {!error ? <div className="results">Result: {result}</div> : <div className="error"><strong>Error: </strong>{error}</div>}
            </div>
        </div>
    )
}
