import React, {useState} from 'react';
import Arrow from './Arrow';

export default function RubicYZ({el, rubicByYZ, oneCubeSize}) {
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
        <div className='YZ'
        style={{
          transform: `rotateY(-90deg) rotateZ(${YZstyle}deg) translateX(-100px) translateY(-100px) translateZ(${
            (el-0.5) * -oneCubeSize
          }px)`,
          transition: `1s all`,
          transformStyle: "preserve-3d",
          opacity: `1`
      }}
      >
        <div className="full face">
          {rubicByYZ.left.slice(9*el + 9, 9 * el + 18).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
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
          {rubicByYZ.back.slice(3 * el + 3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
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
          {rubicByYZ.front.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
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
          {rubicByYZ.bottom.slice(3 * el +3 , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
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
          {rubicByYZ.top.slice(3 * el + 3  , 3 * el + 6).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
            ))}
        </div>
        <div
          className="face full"
          style={{
            transform: `rotateX(180deg) translateZ(${oneCubeSize}px)`,
          }}
        >
        {rubicByYZ.right.slice(9 * el + 9, 9 * el + 18).map((color) => (
            <Arrow color={color} l={leftYZ} r={rightYZ} u={leftYZ} d={rightYZ}/>
          ))}
        </div>
      </div>
    )
}