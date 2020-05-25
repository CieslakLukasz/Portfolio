import React, {useState} from 'react';
import Arrow from './Arrow';

export default function RubicXZ({el, rubicByXZ, oneCubeSize}) {
const [XZstyle, setXZstyle] = useState(0);
const [XYstyle, setXYstyle] = useState(0);
const [YZstyle, setYZstyle] = useState(0);

let leftXZ= () => {
    setXZstyle(prev => prev - 90)
  }
let rightXZ =()=> {
  setXZstyle(prev=> prev + 90)
}
let leftXY = () => {
  setXYstyle(prev => prev - 90)
}
let rightXY = () => {
  setXYstyle(prev => prev + 90)
}

let leftYZ = () => {
  setYZstyle(prev => prev - 90)
}
let rightYZ = () => {
  setYZstyle(prev => prev + 90)
}


    return (
        <div className='XZ'
        style={{
            transform: `rotateX(90deg) rotateZ(${XZstyle}deg) translateY(-100px) translateX(-100px) translateZ(${
              (el+1) * -oneCubeSize
            }px)`,
            transition: `1s all`,
            transformStyle: "preserve-3d",
            opacity: `1`
        }}
      >
        <div className="face full">
          {rubicByXZ.top.slice(9*el +9, 9 * el + 18).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>
            ))}
        </div>
        <div
          className="face partX"
          style={{
            transform: ` translateY(${oneCubeSize}px) translateX(-50%) translateZ(${
              -oneCubeSize / 2
            }px) rotateX(90deg) rotateY(90deg)`,
          }}
        >
          {rubicByXZ.left.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>
          ))}
        </div>
        <div
          className="face partX"
          style={{
            transform: ` translateY(${oneCubeSize}px) translateX(50%) translateZ(${
              -oneCubeSize / 2
            }px) rotateX(90deg) rotateY(-90deg)`,
          }}
        >
          {rubicByXZ.right.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>
            ))}
        </div>
        <div
          className="face partX"
          style={{
            transform: `translateY(${oneCubeSize * 2.5}px) translateZ(${
              -oneCubeSize / 2
            }px) rotateX(90deg)`,
          }}
        >
          {rubicByXZ.front.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>
            ))}
        </div>
        <div
          className="face partX"
          style={{
            transform: ` translateY(${-(oneCubeSize * 0.5)}px) translateZ(${
              -oneCubeSize / 2
            }px) rotateX(90deg) rotateY(180deg)`,
          }}
        >
          {rubicByXZ.back.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>
            ))}
        </div>
        <div
          className="face full"
          style={{
            transform: `rotateX(180deg) translateZ(${oneCubeSize}px)`,
          }}
        >
          {rubicByXZ.bottom.slice(9 * el+9, 9 * el + 18).map((color) => (
            <Arrow color={color} l={leftXZ} r={rightXZ} u={leftXY} d={rightXY}/>))}
        </div>
      </div>
    )
}
