import React from 'react'
import * as f from './frontendLogic'

export function Category({category, c$, updateCats, filterCats}) {
  // checkbox function
  function handleCheck() {
    // read/write
    const new_cat = c$(category.id);
    // remove the outdated object
    const i = filterCats(category);
    // toggle the selected state in the updated object
    new_cat.selected = !new_cat.selected
    // add the updated object
    updateCats(new_cat, i);
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
          <input id={ category.id + '_check' } type="checkbox" onClick={ handleCheck } />
      </div>
    </label>
  )
}
