import React from 'react';
import './Memory.scss';

const generateBacksTable = (nr) => {
    const arr = []
    for(let i =1; i<=nr ; i++){
        arr.push(`/assets/images/memocards/back${i}.jpg`)
    }
    return arr
}


export default function Backs({handleBackClick}) {



    return (
        <div className="backImgAllChoice">
        {generateBacksTable(5).map(el => <img className='backImg' src={el}  name={el} onClick={handleBackClick} />)}
        </div>
    )
}
