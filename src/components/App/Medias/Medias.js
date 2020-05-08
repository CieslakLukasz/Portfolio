import React from 'react'

export default function Medias({el}) {
    let style = {
        background:el.color

    }

    
    return <div  className="smedia" style={style}>{el.name}</div>
}
