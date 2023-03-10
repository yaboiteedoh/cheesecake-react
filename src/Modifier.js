import React from 'react'
import * as f from './frontendLogic'

export function Modifier({modifier, m$, activate, deactivate}) {
    // checkbox function
    const handleCheck = () => {
        // toggle the selected state in the relevant backend object
        m$(modifier.id).selected = !m$(modifier.id).selected;
        // depending on selected state
        if (m$(modifier.id).selected){
            activate(modifier.id)
            // styling
            f.e$('#' + modifier.id).parentElement.style.background = 'rgb(70, 0, 0)';
        // depending on selected state
        } else {
            deactivate(modifier.id)
            // styling
            f.e$('#' + modifier.id).parentElement.style.background = 'rgb(44, 0, 0)';
        }
    }

  return (
    // build the frontend object
    <label htmlFor={ modifier.id + '_check' } className="mod_container" key={ modifier.id }>
        <div id={ modifier.id } className ='modifier'>
            { m$(modifier.id).text }
            <input id={ modifier.id + '_check' } type="checkbox" onChange={ handleCheck } />
        </div>
    </label>
  )
}
