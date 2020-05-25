import React from 'react'

export default function arrow({color, l,r,u,d}) {
    return (
      <div style={{ backgroundColor: color }}>
      {color !== 'black'? (
        <>
      <span onClick={r} className='moveright'> &#11162;</span>
      <span onClick={l} className='moveleft'> &#11160;</span>
      <span onClick={u} className='moveup'> &#11163;</span>
      <span onClick={d} className='movedown'> &#11161;</span>
      </>)
      : null}
      </div>
)
}

