import React from 'react'
import classNames from 'classnames'
import store from "../store";

const Pagination = () => {
    let buttons = []
    const changePage = (i) =>{
        store.onPage(i)
    }

    if( window.innerWidth >= 600 ){
        if(store.activePage>=5){
            for(let i =store.activePage-4; i <= store.numberOfPages && i < store.activePage+5; ++i){
                buttons.push(<button key={i} className={classNames('paginationItem w6', i === store.activePage ? 'paginationItemActive' : '')} onClick={(e)=>changePage(i)}>{i}</button>)
            }
        } else{
            for(let i =1; i <= store.numberOfPages && i<10; ++i){
                buttons.push(<button key={i} className={classNames('paginationItem w6', i === store.activePage ? 'paginationItemActive' : '')} onClick={(e)=>changePage(i)}>{i}</button>)
            }
        }
    }

    return(
        <div className='pagination'>
            <button onClick={store.previousPage.bind(store)} className='paginationItem'>&lt;</button>
            {buttons.length!==0 && buttons}
            <button onClick={store.nextPage.bind(store)} className='paginationItem'>&gt;</button>
        </div>
    )
}

export default Pagination