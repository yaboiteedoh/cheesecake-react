import React from 'react'
import * as f from './frontendLogic'

export function Category({category, c$}) {
  // checkbox function
  function handleCheck() {
    // toggle the selected state in the relevant backend object
    c$(category.id).selected = !c$(category.id).selected
    // style depending on selected state
    if (c$(category.id).selected) {
      f.e$('#' + category.id).parentElement.style.background = 'rgb(74, 47, 0)'
      // style depending on selected state
    } else {
      f.e$('#' + category.id).parentElement.style.background = 'rgb(44, 28, 0)'
      }
  }

  return (
    // build the frontend object
    <label htmlFor={ category.id + '_check' } className='cat_container'>
      <div id={ category.id } className = 'category'>
          { c$(category.id).text }
          <input id={ category.id + '_check' } type="checkbox" onChange= { handleCheck }/>
      </div>
    </label>
  )
}
