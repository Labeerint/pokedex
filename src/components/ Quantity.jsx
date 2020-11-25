import React from 'react'
import classNames from 'classnames'
import store from "../store";
import {observer} from "mobx-react";

const Quantity = observer(() => {
    return(
        <div className='quantity'>
            {store.quantity.map((item, index) => <span key={index}
                                                 onClick={()=>store.changeCurrentQuantity(item)}
                                                 className={classNames(
                                                     'quantityItem',
                                                        store.currentQuantity === item ? 'quantityItemActive' : ''
                                                 )}
            >{item}</span>)}
        </div>
    )
})

export default Quantity