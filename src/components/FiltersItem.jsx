import React, {useRef} from 'react'
// eslint-disable-next-line react-hooks/rules-of-hooks


const FiltersItem = ({name, onSelectType}) =>{
    const thisInput = useRef()
    return(
            <label  className='filtersItem'>
                <input ref={thisInput}
                       type="checkbox"
                       className='filtersCheckBox'
                       onChange={()=>onSelectType(thisInput,name)}
                />{name}
            </label>
    )
}

export default FiltersItem