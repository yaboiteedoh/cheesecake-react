import React from 'react'
import { Category } from './Category'

export function CategoryList({c$, cats}) {
  return (
    <div className="cat_list">
        {cats.map((category) => (
            <Category category={category} c$={c$} key={ category.id }/>
        ))}
    </div>
  )
}
