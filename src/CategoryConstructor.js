import React from 'react'
import { useState } from 'react'
import * as f from './frontendLogic'

export function CategoryConstructor({new_cat}) {
    // states
    const [value, setValue] = useState("");

    // button function
    function handleClick(button) {
        // clear button
        if (button === "C"){
            setValue("");
        // backspace button
        } else if (button === "B"){
            setValue(value.substring(0, value.length - 1));
        // submit button
        } else if (button === "S"){
            // if relevent fields aren't empty
            if (f.e$('#cat_title').value && value){
                // create the backend object
                new_cat(f.e$('#cat_title').value, f.e$('#cat_value').innerText);
            } else {
                alert("Please provide a title and value")
            }
        // numpad buttons
        } else {
            setValue(value + String(button));
        }
    }

    // build the frontend object
    return (
        <div className="cat_construct">
            <div className="cat_row">
                <button onClick={ () => { handleClick("C"); }}>C</button>
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
            <input id="cat_title" placeholder="TITLE INPUT"></input>
            <div id="cat_value">{ value }</div>
            <button onClick={ () => { handleClick("S"); } }>SUBMIT</button>
        </div>
  )
}
