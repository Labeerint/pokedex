import React from 'react'
import classNames from 'classnames'

const Pagination = ({onNext, onPrevious, onPage, numberOfPages, activePage}) => {
    let buttons = []
    const changePage = (i) =>{
        onPage(i)
    }

    if( window.innerWidth >= 600 ){
        if(activePage>=5){
            for(let i =activePage-4; i <= numberOfPages && i < activePage+5; ++i){
                buttons.push(<button key={i} className={classNames('paginationItem w6', i === activePage ? 'paginationItemActive' : '')} onClick={(e)=>changePage(i)}>{i}</button>)
            }
        } else{
            for(let i =1; i <= numberOfPages && i<10; ++i){
                buttons.push(<button key={i} className={classNames('paginationItem w6', i === activePage ? 'paginationItemActive' : '')} onClick={(e)=>changePage(i)}>{i}</button>)
            }
        }
    }

    return(
        <div className='pagination'>
            <button onClick={onPrevious} className='paginationItem'>&lt;</button>
            {buttons.length!==0 && buttons}
            <button onClick={onNext} className='paginationItem'>&gt;</button>
        </div>
    )
}

export default Pagination