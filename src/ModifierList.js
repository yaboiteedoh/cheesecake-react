import React from 'react'
import { Modifier } from './Modifier'

export function ModifierList({m$, mods, activate, deactivate, updateMods, filterMods}) {
  return (
    <div className="mod_list">
        {mods.map((modifier) => (
            <Modifier 
              modifier={modifier} 
              m$={m$} 
              activate={activate} 
              deactivate={deactivate} 
              updateMods={updateMods} 
              filterMods={filterMods} 
              key={ modifier.id } />
        ))}
    </div>
  )
}
