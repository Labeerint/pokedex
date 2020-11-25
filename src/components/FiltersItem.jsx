import React, {useRef} from 'react'
import store from '../store'
import {observer} from "mobx-react";



const FiltersItem = observer(({name}) =>{
    const thisInput = useRef()
    const onType =()=>{
        store.onSelectType(thisInput, name)

    }

    if(store.cleanFilters && thisInput.current !== undefined)
       thisInput.current.checked = false


    return(
            <label  className='filtersItem'>
                <input
                        ref={thisInput}
                       type="checkbox"
                       className='filtersCheckBox'
                       onChange={()=>onType(thisInput, name)}
                />{name}
            </label>
    )
})
export default FiltersItem