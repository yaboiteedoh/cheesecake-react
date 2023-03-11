import React from 'react'
import * as f from './frontendLogic'

export function Modifier({modifier, m$, activate, deactivate, updateMods, filterMods}) {
  // checkbox function
  function handleCheck() {
    // read/write
    const new_mod = m$(modifier.id);
    // remove the outdated object
    const i = filterMods(modifier);
    // toggle the selected state in the updated object
    new_mod.selected = !new_mod.selected
    // add the updated object
    updateMods(new_mod, i);
    // style depending on selected state
    if (m$(modifier.id).selected) {
        activate(modifier.id)
        f.e$('#' + modifier.id).parentElement.style.background = 'rgb(70, 0, 0)'
    // style depending on selected state
    } else {
        deactivate(modifier.id)
        f.e$('#' + modifier.id).parentElement.style.background = 'rgb(44, 0, 0)'
    }
  }

  return (
    // build the frontend object
    <label htmlFor={ modifier.id + '_check' } className="mod_container" key={ modifier.id }>
        <div id={ modifier.id } className ='modifier'>
            { m$(modifier.id).text }
            <input id={ modifier.id + '_check' } type="checkbox" onClick={ handleCheck } />
        </div>
    </label>
  )
}
