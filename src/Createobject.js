import React from 'react'
import * as f from './frontendLogic'
import { useState, useEffect } from 'react'

export function Createobject() {
    const [sel, setSel] = useState('')

    useEffect(() => {
        if (sel === 'cat') {
            f.e$('#add_modifier').dataset.selected = false;
            f.e$('#add_modifier').parentElement.style.background = 'rgb(44, 0, 0)'
            f.e$('#add_category').dataset.selected = true;
            f.e$('#add_category').parentElement.style.background = 'rgb(74, 47, 0)'
        } else if (sel === 'mod') {
            f.e$('#add_category').dataset.selected = false;
            f.e$('#add_category').parentElement.style.background = 'rgb(44, 28, 0)'
            f.e$('#add_modifier').dataset.selected = true;
            f.e$('#add_modifier').parentElement.style.background = 'rgb(70, 0, 0)'
        }
    })

  function handleCheckCat(){
    setSel('cat')
  }

  function handleCheckMod(){
    setSel('mod')
  }

  return (
    <div className="create_object">
        <label htmlFor='add_modifier_check' className="add_modifier">
            <div id='add_modifier' data-selected="false">
                +M
                <input id='add_modifier_check' type="checkbox" onClick={ handleCheckMod } />
            </div>
        </label>

        <label htmlFor='add_category_check' className="add_category">
            <div id='add_category' data-selected="false">
                +C
                <input id='add_category_check' type="checkbox" onClick={ handleCheckCat } />
            </div>
        </label>
    </div>
  )
}
