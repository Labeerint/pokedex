import React from 'react'
import classNames from 'classnames'

const Pagination = ({onNext, onPrevious, step, onPage, numberOfPages, activePage}) => {
    let buttons = []
    let i =1
    let limit = 10
    console.log('i', i)
    console.log('numberOfPages', numberOfPages)
    console.log('activePage', activePage)


    const changePage = (i) =>{
        onPage(i)
    }

    if(activePage>=10){
        for(let i =activePage-9; i <= numberOfPages && i < activePage+10; ++i){
            buttons.push(<button key={i}
                                 className={classNames(
                                     'paginationItem',
                                     i === activePage ? 'paginationItemActive' : '')}
                                 onClick={(e)=>changePage(i)}
            >{i}</button>)
        }
    } else{
        for(let i =1; i <= numberOfPages && i<20; ++i){
            buttons.push(<button key={i}
                                 className={classNames(
                                     'paginationItem',
                                     i === activePage ? 'paginationItemActive' : '')}
                                 onClick={(e)=>changePage(i)}
            >{i}</button>)
        }
    }


    return(
        <div className='pagination'>
            <button onClick={()=>onPrevious(step)} className='paginationItem'>сюда</button>
            {buttons}
            <button onClick={()=>onNext(step)} className='paginationItem'>туда</button>
        </div>
    )
}

export default Pagination