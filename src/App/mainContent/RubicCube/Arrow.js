import React from 'react'

export default function arrow({color, l,r,u,d , ind, site}) {

  const left = () => {
    l(ind,site)
  }
  const right = () => {
    r(ind,site)
  }
  const up = () => {
    u(ind,site)
  }
  const down = () => {
    d(ind,site)
  }


    return (
      <div style={{ backgroundColor: color }}>
      {color !== 'black'? (
        <>
      <span onClick={right} className='moveright'> &#11162;</span>
      <span onClick={left} className='moveleft'> &#11160;</span>
      <span onClick={up} className='moveup'> &#11163;</span>
      <span onClick={down} className='movedown'> &#11161;</span>
      </>)
      : null}
      </div>
)
}

