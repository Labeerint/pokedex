import React from 'react'

const Pagination = ({onNext, onPrevious, step}) => {
    return(
        <div className='pagination'>
            <button onClick={()=>onPrevious(step)} className='paginationItem'>сюда</button>
            <button onClick={()=>onNext(step)} className='paginationItem'>туда</button>
        </div>
    )
}

export default Pagination