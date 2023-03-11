import React from 'react'
import { Category } from './Category'

export function CategoryList({c$, cats, updateCats, filterCats}) {
  return (
    <div className="cat_list">
        {cats.map((category) => (
            <Category 
              category={category} 
              c$={c$} updateCats={updateCats} 
              filterCats={filterCats} 
              key={ category.id }/>
        ))}
    </div>
  )
}
