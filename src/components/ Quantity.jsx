import React from 'react'
import classNames from 'classnames'

const Quantity = ({quantity, onCahngeQuantity, currentQuantity}) => {
    return(
        <div className='quantity'>
            {quantity.map((item, index) => <span key={index}
                                                 onClick={()=>onCahngeQuantity(item)}
                                                 className={classNames(
                                                     'quantityItem',
                                                        currentQuantity === item ? 'quantityItemActive' : ''
                                                 )}
            >{item}</span>)}
        </div>
    )
}

export default Quantity