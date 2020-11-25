import React, {useRef} from 'react'
import store from '../store'



const FiltersItem = ({name}) =>{
    const thisInput = useRef()

    const onType =()=>{
        store.onSelectType(thisInput, name)
    }

    return(
            <label  className='filtersItem'>
                <input ref={thisInput}
                       type="checkbox"
                       className='filtersCheckBox'
                       onChange={()=>onType(thisInput, name)}
                />{name}
            </label>
    )
}

export default FiltersItem