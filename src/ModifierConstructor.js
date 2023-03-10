import React from 'react'
import { useState } from 'react'
import * as f from './frontendLogic'

export function ModifierConstructor({new_mod}) {
    // states
    const [value, setValue] = useState("");
    const [operator, setOperator] = useState("");

    // button function
    function handleClick(button) {
        // clear button
        if (button === "C"){
            setValue("");
        } else if (button === "+"){
            setOperator("+");
        } else if (button === "-"){
            setOperator("-");
        // backspace button
        } else if (button === "B"){
            setValue(value.substring(0, value.length - 1));
        // submit button
        } else if (button === "S"){
            // if relevent fields aren't empty
            if (f.e$('#mod_title').value && operator && value){
                // create the backend object
                new_mod(f.e$('#mod_title').value, f.e$('#mod_operator').innerText, f.e$('#mod_value').innerText);
            } else {
                alert("Please provide a title, operator, and value")
            }
        // numpad buttons
        } else {
            setValue(value + String(button));
        }
    }

    // build the frontend object
    return (
        <div className="mod_construct">
            <div className="mod_row">
                <button onClick={ () => { handleClick("C"); }}>C</button>
                <button onClick={ () => { handleClick("+"); }}>+</button>
                <button onClick={ () => { handleClick("-"); }}>-</button>
                <button onClick={ () => { handleClick("B"); }}>⌫</button>
            </div>
            <div className="numpad">
                <button className="numkey" onClick={ () => { handleClick("9"); }}>9</button>
                <button className="numkey" onClick={ () => { handleClick("8"); }}>8</button>
                <button className="numkey" onClick={ () => { handleClick("7"); }}>7</button>
                <button className="numkey" onClick={ () => { handleClick("6"); }}>6</button>
                <button className="numkey" onClick={ () => { handleClick("5"); }}>5</button>
                <button className="numkey" onClick={ () => { handleClick("4"); }}>4</button>
                <button className="numkey" onClick={ () => { handleClick("3"); }}>3</button>
                <button className="numkey" onClick={ () => { handleClick("2"); }}>2</button>
                <button className="numkey" onClick={ () => { handleClick("1"); }}>1</button>
                <button className="numkey_zero" onClick={ () => { handleClick("0"); }}>0</button>
            </div>
            <input id="mod_title" placeholder="TITLE INPUT"></input>
            <div className="mod_label">
                <div id="mod_operator">{ operator }</div>
                <div id="mod_value">{ value }</div>
            </div>
            <button onClick={ () => { handleClick("S"); } }>SUBMIT</button>
        </div>
  )
}
