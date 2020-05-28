import React, { useState,  useEffect } from "react";
import "./Rubc.scss";
import RubicXZ from "./RubicXZ";
import RubicXY from "./RubicXY";
import RubicYZ from "./RubicYZ";
import Controlers from "./Controlers";
import {black, transparent,topSide, frontSide,rightSide,leftSide,backSide,bottomSide} from './SidesColors'

export default function Rubic({winW}) {
  // we got 3 rows in X 3 in Y and 3 in Z so w need row patern:
  const numberOfRows = [-1, 0, 1];
  // in each direction we need pattern of our colors to display
  const [rubicByXZ, setRubicByXZ] = useState({
    top: [...topSide, ...black, ...black],
    front: [...frontSide],
    right: [...rightSide],
    back: [...backSide],
    left: [...leftSide],
    bottom: [...black, ...black, ...bottomSide],
  });
  const [rubicByXY, setRubicByXY] = useState({
    top: [...topSide],
    front: [...frontSide, ...black, ...black],
    right: [...rightSide],
    back: [...black, ...black, ...backSide],
    left: [...leftSide],
    bottom: [...bottomSide],
  });
  const [rubicByYZ, setRubicByYZ] = useState({
    top: [...topSide],
    front: [...frontSide],
    right: [...black, ...black, ...rightSide],
    back: [...backSide],
    left: [...leftSide, ...black, ...black],
    bottom: [...bottomSide],
  });
  const [rubicControlers] = useState({
    top: [...transparent],
    front: [...transparent],
    right: [...transparent],
    back: [...transparent],
    left: [...transparent],
    bottom: [...transparent],
  });
  //size of single One Cube just gonna change on resize so 66 for desktop 33 for mobile
  let [oneCubeSize, setOneCubeSize] = useState(winW < 800? 33 : 66);

  //some stuff to change our view point
  const [animation, setAnimation] = useState(false);
  const [rubicStyles, setRubicStyles] = useState({
    X: `-10`,
    Y: `30`,
  });
  const [intervalOne, setIntervalOne] = useState(false);

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  };

  useEffect(() => {
    let intervalId;
    if (animation) {
      intervalId = setInterval(() => {
        setRubicStyles((prev) => ({
          ...prev,
          X: `${prev.X - 1}`,
          Y: `${prev.Y - 1}`,
        }));
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [animation]);

  let turnLeft = () => {
    setAnimation(false);
    let intervalId = setInterval(() => {
      setRubicStyles((prev) => ({ ...prev, Y: `${prev.Y - 8}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let turnRight = () => {
    setAnimation(false);
    let intervalId = setInterval(() => {
      setRubicStyles((prev) => ({ ...prev, Y: `${prev.Y - -8}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let turnUp = () => {
    setAnimation(false);
    let intervalId = setInterval(() => {
      setRubicStyles((prev) => ({ ...prev, X: `${prev.X - -8}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let turnDown = () => {
    setAnimation(false);
    let intervalId = setInterval(() => {
      setRubicStyles((prev) => ({ ...prev, X: `${prev.X - 8}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let stop = () => {
    clearInterval(intervalOne);
  };

  // style to change in 90deg move each direction we gonna send it via props to correct mirror of our cube

  const [XZstyle, setXZstyle] = useState({
    left: 0,
    mid: 0,
    right: 0,
  });
  const [XYstyle, setXYstyle] = useState({
    left: 0,
    mid: 0,
    right: 0,
  });
  const [YZstyle, setYZstyle] = useState({
    left: 0,
    mid: 0,
    right: 0,
  });

// setting things visable/unvisable depends of arrow we click
const [controlersActive, toggleControlersActive]=useState(true);
const [rubicActive, setRubicActive]=useState({
  XZ:true,
  XY:false,
  YZ: false
})

//changing other cubes to same pattern like one we move.

  //paterns of change
const YZFromXY = () => {
  let t = rubicByXY.top;
  let f = rubicByXY.front;
  let r = rubicByXY.right;
  let bc = rubicByXY.back;
  let l = rubicByXY.left;
  let bt = rubicByXY.bottom;
  setRubicByYZ({
    top: [t[2], t[5],t[8],t[1],t[4],t[7],t[0],t[3],t[6]],
    front:[f[6],f[3],f[0],f[7],f[4],f[1],f[8],f[5],f[2]],
    right:[...black, ...black, r[6],r[3],r[0],r[7],r[4],r[1],r[8],r[5],r[2]],
    back:[bc[24],bc[21],bc[18],bc[25],bc[22],bc[19],bc[26],bc[23],bc[20]],
    left:[l[6],l[3],l[0],l[7],l[4],l[1],l[8],l[5],l[2]],
    bottom:[bt[6],bt[3],bt[0],bt[7],bt[4],bt[1],bt[8],bt[5],bt[2]],
  });
}
const XZFromXY = () => {
  let t = rubicByXY.top;
  let f = rubicByXY.front;
  let r = rubicByXY.right;
  let bc = rubicByXY.back;
  let l = rubicByXY.left;
  let bt = rubicByXY.bottom;
  setRubicByXZ({
    top: [t[8], t[7],t[6],t[5],t[4],t[3],t[2],t[1],t[0]],
    front:[...f],
    right:[r[2],r[5],r[8],r[1],r[4],r[7],r[0],r[3],r[6]],
    back:[bc[26],bc[25],bc[24],bc[23],bc[22],bc[21],bc[20],bc[19],bc[18]],
    left:[l[6],l[3],l[0],l[7],l[4],l[1],l[8],l[5],l[2]],
    bottom:[...black, ...black, bt[0],bt[1],bt[2],bt[3],bt[4],bt[5],bt[6],bt[7],bt[8]],
  });
}
const XZFromYZ = () => {
  let t = rubicByYZ.top;
  let f = rubicByYZ.front;
  let r = rubicByYZ.right;
  let bc = rubicByYZ.back;
  let l = rubicByYZ.left;
  let bt = rubicByYZ.bottom;
  setRubicByXZ({
    top: [t[2], t[5],t[8],t[1],t[4],t[7],t[0],t[3],t[6]],
    front:[f[2],f[5],f[8],f[1],f[4],f[7],f[0],f[3],f[6]],
    right:[r[26],r[25],r[24],r[23],r[22],r[21],r[20],r[19],r[18]],
    back:[bc[6],bc[3],bc[0],bc[7],bc[4],bc[1],bc[8],bc[5],bc[2]],
    left:[l[0],l[1],l[2],l[3],l[4],l[5],l[6],l[7],l[8]],
    bottom:[...black, ...black, bt[2],bt[5],bt[8],bt[1],bt[4],bt[7],bt[0],bt[3],bt[6]],
  });
}
const XYFromYZ = () => {
  let t = rubicByYZ.top;
  let f = rubicByYZ.front;
  let r = rubicByYZ.right;
  let bc = rubicByYZ.back;
  let l = rubicByYZ.left;
  let bt = rubicByYZ.bottom;
  setRubicByXZ({
    top: [t[8], t[5],t[2],t[7],t[4],t[1],t[6],t[3],t[0]],
    front:[f[2],f[5],f[8],f[1],f[4],f[7],f[0],f[3],f[6]],
    right:[r[20],r[23],r[26],r[19],r[22],r[25],r[18],r[21],r[24]],
    back:[...black,...black, bc[2],bc[5],bc[8],bc[1],bc[4],bc[7],bc[0],bc[3],bc[6]],
    left:[l[2],l[5],l[8],l[1],l[4],l[7],l[0],l[3],l[6]],
    bottom:[bt[2],bt[5],bt[8],bt[1],bt[4],bt[7],bt[0],bt[3],bt[6]],
  });
}
const XYFromXZ = () => {
  let t = rubicByXZ.top;
  let f = rubicByXZ.front;
  let r = rubicByXZ.right;
  let bc = rubicByXZ.back;
  let l = rubicByXZ.left;
  let bt = rubicByXZ.bottom;
  setRubicByXY({
    top: [t[8], t[7],t[6],t[5],t[4],t[3],t[2],t[1],t[0]],
    front:[...f],
    right:[r[6],r[3],r[0],r[7],r[4],r[1],r[8],r[5],r[2]],
    back:[...black, ...black, bc[8],bc[7],bc[6],bc[5],bc[4],bc[3],bc[2],bc[1],bc[0]],
    left:[l[2],l[5],l[8],l[1],l[4],l[7],l[0],l[3],l[6]],
    bottom:[bt[18],bt[19],bt[20],bt[21],bt[22],bt[23],bt[24],bt[25],bt[26]],
  });
}
const YZFromXZ = () => {
  let t = rubicByXZ.top;
  let f = rubicByXZ.front;
  let r = rubicByXZ.right;
  let bc = rubicByXZ.back;
  let l = rubicByXZ.left;
  let bt = rubicByXZ.bottom;
  setRubicByXY({
    top: [t[0], t[3],t[6],t[1],t[4],t[7],t[2],t[5],t[8]],
    front:[f[6],f[3],f[0],f[7],f[4],f[1],f[8],f[5],f[2]],
    right:[...black, ...black, r[8],r[7],r[6],r[5],r[4],r[3],r[2],r[1],r[0]],
    back:[bc[2],bc[5],bc[8],bc[1],bc[4],bc[7],bc[0],bc[3],bc[6]],
    left:[...l],
    bottom:[bt[24],bt[21],bt[18],bt[25],bt[22],bt[19],bt[26],bt[23],bt[20]],
  });
}


  //change 2nd cube after we move some side and show controlers again
  useEffect(() => {
    if(controlersActive){
      return;
    }
    if(rubicActive.XZ){
      YZFromXY()}
    if(rubicActive.YZ){
      XYFromXZ()}
    if(rubicActive.XY){
      XZFromYZ()}
            setTimeout(() => {
            toggleControlersActive(true)
          }, 1150)
  }, [XZstyle, XYstyle, YZstyle])
  // change rotations to start point after that swap pattern on cube we just moved (3rd one) to same as rest, and showing anther one visable same time
  useEffect(() => {
  if(!controlersActive){ return}
setXZstyle({
  left: 0,
  mid: 0,
  right: 0,
});
setXYstyle({
  left: 0,
  mid: 0,
  right: 0,
});
setYZstyle({
  left: 0,
  mid: 0,
  right: 0,
})
if(rubicActive.XZ){
  setRubicActive({XZ:false,
    XY:true,
    YZ: false});
  XZFromYZ();
  }
if(rubicActive.YZ){
  setRubicActive({XZ:true,
    XY:false,
    YZ: false});
  YZFromXY()}
if(rubicActive.XY){
  setRubicActive({XZ:false,
    XY:false,
    YZ: true});
   XYFromXZ();
  }
  }, [controlersActive])

// all moves of cube so 2x XZ 2x YZ 2x YZ (left / right each)
// unshowing controler arrows and setting pattern of 1st cube by this change
//so ie. we move XZ -> we change pattern of XY (1st one)here
//then above we change YZ (2nd) in first useEffect and in 2nd useEffect we set rotation to 0 again
// then we change our XZ (3rd one, we just moved) pattern so all 3 paterns gona be same and ready for next move
  let leftXZ = (ind) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:true,
      XY:false,
      YZ: false});
      setTimeout(() => {
         if (ind === 0 || ind === 1 || ind === 2) {
      setRubicByXY(prev => ({...prev,
        top: [prev.top[6],prev.top[3],prev.top[0],prev.top[7],prev.top[4],prev.top[1],prev.top[8],prev.top[5],prev.top[2]],
        front: [prev.right[2],prev.right[5],prev.right[8], ...prev.front.slice(3,9), ...black, ...black],
        right: [prev.right[0],prev.right[1],prev.back[26],prev.right[3],prev.right[4],prev.back[25],prev.right[6],prev.right[7],prev.back[24]],
        back: [...black, ...black, ...prev.back.slice(18,24), prev.left[0], prev.left[3], prev.left[6]],
        left: [prev.front[2],prev.left[1],prev.left[2],prev.front[1],prev.left[4],prev.left[5],prev.front[0],prev.left[7],prev.left[8]],
        bottom: [...prev.bottom],
      }))
      setXZstyle((prev) => ({ ...prev, left: prev.left + 90 }));
    } else if (ind === 3 || ind === 4 || ind === 5) {

      setRubicByXY(prev => ({...prev,
        top: [...prev.top],
        front: [...prev.front.slice(0,3), prev.right[1],prev.right[4],prev.right[7], ...prev.front.slice(6,9), ...black, ...black],
        right: [prev.right[0],prev.back[23],prev.right[2],prev.right[3],prev.back[22],prev.right[5],prev.right[6],prev.back[21],prev.right[8]],
        back: [...black, ...black, ...prev.back.slice(18,21), prev.left[1], prev.left[4], prev.left[7], ...prev.back.slice(24,27)],
        left: [prev.left[0],prev.front[5],prev.left[2],prev.left[3],prev.front[4],prev.left[5],prev.left[6],prev.front[3],prev.left[8]],
       bottom: [...prev.bottom],
      }))
      setXZstyle((prev) => ({ ...prev, mid: prev.mid + 90 }));
    } else {

      setRubicByXY(prev => ({...prev,
top: [...prev.top],
        front: [...prev.front.slice(0,6),prev.right[0],prev.right[3],prev.right[6],  ...black, ...black],
        right: [prev.back[20], prev.right[1],prev.right[2],prev.back[19],prev.right[4],prev.right[5],prev.back[18],prev.right[7],prev.right[8]],
        back: [...black, ...black, prev.left[2], prev.left[5], prev.left[8], ...prev.back.slice(21,27)],
        left: [prev.left[0],prev.left[1],prev.front[8],prev.left[3],prev.left[4],prev.front[7],prev.left[6],prev.left[7],prev.front[6],],
        bottom: [prev.bottom[2],prev.bottom[5],prev.bottom[8],prev.bottom[1],prev.bottom[4],prev.bottom[7],prev.bottom[0],prev.bottom[3],prev.bottom[6]],
      }))
      setXZstyle((prev) => ({ ...prev, right: prev.right + 90 }));
    }
      }, 100);
  };
  let rightXZ = (ind) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:true,
      XY:false,
      YZ: false});
      setTimeout(() => {
         if (ind === 0 || ind === 1 || ind === 2) {
           console.log('to tutaj?')
          setRubicByXY(prev => ({...prev,
            top: [prev.top[2],prev.top[5],prev.top[8],prev.top[1],prev.top[4],prev.top[7],prev.top[0],prev.top[3],prev.top[6]],
            front: [prev.left[6],prev.left[3],prev.left[0], ...prev.front.slice(3,9), ...black, ...black],
            right: [prev.right[0],prev.right[1],prev.front[0],prev.right[3],prev.right[4],prev.front[1],prev.right[6],prev.right[7],prev.front[2]],
            back: [...black, ...black, ...prev.back.slice(18,24), prev.right[8], prev.right[5], prev.right[2]],
            left: [prev.back[24],prev.left[1],prev.left[2],prev.back[25],prev.left[4],prev.left[5],prev.back[26],prev.left[7],prev.left[8]],
            bottom: [...prev.bottom],
          }))
      setXZstyle((prev) => ({ ...prev, left: prev.left - 90 }));
    } else if (ind === 3 || ind === 4 || ind === 5) {
      setRubicByXY(prev => ({...prev,
        top: [...prev.top],
        front: [...prev.front.slice(0,3), prev.left[7],prev.left[4],prev.left[1], ...prev.front.slice(6,9), ...black, ...black],
        right: [prev.right[0],prev.front[3],prev.right[2],prev.right[3],prev.front[4],prev.right[5],prev.right[6],prev.front[5],prev.right[8]],
        back: [...black, ...black, ...prev.back.slice(18,21), prev.right[7], prev.right[4], prev.right[1], ...prev.back.slice(24,27)],
        left: [prev.left[0],prev.back[21],prev.left[2],prev.left[3],prev.back[22],prev.left[5],prev.left[6],prev.back[23],prev.left[8]],
       bottom: [...prev.bottom],
      }))
      setXZstyle((prev) => ({ ...prev, mid: prev.mid - 90 }));
    } else {
      setRubicByXY(prev => ({...prev,
        top: [...prev.top],
                front: [...prev.front.slice(0,6),prev.left[8],prev.left[5],prev.left[2],  ...black, ...black],
                right: [prev.front[6], prev.right[1],prev.right[2],prev.front[7],prev.right[4],prev.right[5],prev.front[8],prev.right[7],prev.right[8]],
                back: [...black, ...black, prev.right[6], prev.right[3], prev.right[0], ...prev.back.slice(21,27)],
                left: [prev.left[0],prev.left[1],prev.back[18],prev.left[3],prev.left[4],prev.back[19],prev.left[6],prev.left[7],prev.back[20],],
                bottom: [prev.bottom[6],prev.bottom[3],prev.bottom[0],prev.bottom[7],prev.bottom[4],prev.bottom[1],prev.bottom[8],prev.bottom[5],prev.bottom[2]],
              }))
      setXZstyle((prev) => ({ ...prev, right: prev.right - 90 }));
    }
      }, 100);
  };
  let leftXY = (ind, site) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:false,
      XY:true,
      YZ: false});
      setTimeout(() => {
         if (site === "top") {
      if (ind === 0 || ind === 1 || ind === 2) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.top[1],prev.right[24],prev.top[3],prev.top[4],prev.right[21],prev.top[6],prev.top[7],prev.right[18]],
          front: [...prev.front],
          right: [...black,...black, prev.bottom[0],prev.right[19],prev.right[20],prev.bottom[3],prev.right[22],prev.right[23],prev.bottom[6],prev.right[25],prev.right[26]],
          back: [prev.back[6],prev.back[3],prev.back[2],prev.back[7],prev.back[4],prev.back[1],prev.back[8],prev.back[5],prev.back[2]],
          left: [prev.top[8],prev.left[1],prev.left[2],prev.top[5],prev.left[4],prev.left[5],prev.top[2],prev.left[7],prev.left[8]],
          bottom: [prev.left[0],prev.bottom[1],prev.bottom[2],prev.left[3],prev.bottom[4],prev.bottom[5],prev.left[6],prev.bottom[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, right: prev.right - 90 }));
      } else if (ind === 3 || ind === 4 || ind === 5) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.right[25],prev.top[2],prev.top[3],prev.right[22],prev.top[5],prev.top[6],prev.right[19],prev.top[8]],
          front: [...prev.front],
          right: [...black,...black, prev.right[18],prev.bottom[1],prev.right[20],prev.right[21],prev.bottom[4],prev.right[23],prev.right[24],prev.bottom[7],prev.right[26]],
          back: [...prev.back],
          left: [prev.left[0],prev.top[7],prev.left[2],prev.left[3],prev.top[4],prev.left[5],prev.left[6],prev.top[1],prev.left[8]],
          bottom: [prev.bottom[0],prev.left[1],prev.bottom[2],prev.bottom[3],prev.left[4],prev.bottom[5],prev.bottom[6],prev.left[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, mid: prev.mid - 90 }));
      } else {
        setRubicByYZ(prev => ({...prev,
          top: [prev.right[26],prev.top[1],prev.top[2],prev.right[23],prev.top[4],prev.top[5],prev.right[20],prev.top[7],prev.top[8]],
          front: [prev.front[2],prev.front[5],prev.front[8],prev.front[1],prev.front[4],prev.front[7],prev.front[0],prev.front[3],prev.front[6]],
          right: [...black,...black, prev.right[18],prev.right[19],prev.bottom[2],prev.right[21],prev.right[22],prev.bottom[5],prev.right[24],prev.right[25],prev.bottom[8]],
          back: [...prev.back],
          left: [prev.left[0],prev.left[1],prev.top[6],prev.left[3],prev.left[4],prev.top[3],prev.left[6],prev.left[7],prev.top[0]],
          bottom: [prev.bottom[0],prev.bottom[1],prev.left[2],prev.bottom[3],prev.bottom[4],prev.left[5],prev.bottom[6],prev.bottom[7],prev.left[8]]
        }))
        setXYstyle((prev) => ({ ...prev, left: prev.left - 90 }));
      }
    } else {
      if (ind === 0 || ind === 3 || ind === 6) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.top[1],prev.right[24],prev.top[3],prev.top[4],prev.right[21],prev.top[6],prev.top[7],prev.right[18]],
          front: [...prev.front],
          right: [...black,...black, prev.bottom[0],prev.right[19],prev.right[20],prev.bottom[3],prev.right[22],prev.right[23],prev.bottom[6],prev.right[25],prev.right[26]],
          back: [prev.back[6],prev.back[3],prev.back[2],prev.back[7],prev.back[4],prev.back[1],prev.back[8],prev.back[5],prev.back[2]],
          left: [prev.top[8],prev.left[1],prev.left[2],prev.top[5],prev.left[4],prev.left[5],prev.top[2],prev.left[7],prev.left[8]],
          bottom: [prev.left[0],prev.bottom[1],prev.bottom[2],prev.left[3],prev.bottom[4],prev.bottom[5],prev.left[6],prev.bottom[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, right: prev.right - 90 }));
      } else if (ind === 4 || ind === 1 || ind === 7) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.right[25],prev.top[2],prev.top[3],prev.right[22],prev.top[5],prev.top[6],prev.right[19],prev.top[8]],
          front: [...prev.front],
          right: [...black,...black, prev.right[18],prev.bottom[1],prev.right[20],prev.right[21],prev.bottom[4],prev.right[23],prev.right[24],prev.bottom[7],prev.right[26]],
          back: [...prev.back],
          left: [prev.left[0],prev.top[7],prev.left[2],prev.left[3],prev.top[4],prev.left[5],prev.left[6],prev.top[1],prev.left[8]],
          bottom: [prev.bottom[0],prev.left[1],prev.bottom[2],prev.bottom[3],prev.left[4],prev.bottom[5],prev.bottom[6],prev.left[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, mid: prev.mid - 90 }));
      } else {
        setRubicByYZ(prev => ({...prev,
          top: [prev.right[26],prev.top[1],prev.top[2],prev.right[23],prev.top[4],prev.top[5],prev.right[20],prev.top[7],prev.top[8]],
          front: [prev.front[2],prev.front[5],prev.front[8],prev.front[1],prev.front[4],prev.front[7],prev.front[0],prev.front[3],prev.front[6]],
          right: [...black,...black, prev.right[18],prev.right[19],prev.bottom[2],prev.right[21],prev.right[22],prev.bottom[5],prev.right[24],prev.right[25],prev.bottom[8]],
          back: [...prev.back],
          left: [prev.left[0],prev.left[1],prev.top[6],prev.left[3],prev.left[4],prev.top[3],prev.left[6],prev.left[7],prev.top[0]],
          bottom: [prev.bottom[0],prev.bottom[1],prev.left[2],prev.bottom[3],prev.bottom[4],prev.left[5],prev.bottom[6],prev.bottom[7],prev.left[8]]
        }))
        setXYstyle((prev) => ({ ...prev, left: prev.left - 90 }));
      }
    }
      }, 100);

  };
  let rightXY = (ind, site) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:false,
      XY:true,
      YZ: false});
      setTimeout(() => {
         if (site === "top") {
      if (ind === 0 || ind === 1 || ind === 2) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.top[1],prev.left[6],prev.top[3],prev.top[4],prev.left[3],prev.top[6],prev.top[7],prev.left[0]],
          front: [...prev.front],
          right: [...black,...black, prev.top[8],prev.right[19],prev.right[20],prev.top[5],prev.right[22],prev.right[23],prev.top[2],prev.right[25],prev.right[26]],
          back: [prev.back[2],prev.back[5],prev.back[8],prev.back[1],prev.back[4],prev.back[7],prev.back[0],prev.back[3],prev.back[6]],
          left: [prev.bottom[0],prev.left[1],prev.left[2],prev.bottom[3],prev.left[4],prev.left[5],prev.bottom[6],prev.left[7],prev.left[8]],
          bottom: [prev.right[18],prev.bottom[1],prev.bottom[2],prev.right[21],prev.bottom[4],prev.bottom[5],prev.right[24],prev.bottom[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, right: prev.right + 90 }));
      } else if (ind === 3 || ind === 4 || ind === 5) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.left[7],prev.top[2],prev.top[3],prev.left[4],prev.top[5],prev.top[6],prev.left[1],prev.top[8]],
          front: [...prev.front],
          right: [...black,...black, prev.right[18],prev.top[7],prev.right[20],prev.right[21],prev.top[4],prev.right[23],prev.right[24],prev.top[1],prev.right[26]],
          back: [...prev.back],
          left: [prev.left[0],prev.bottom[1],prev.left[2],prev.left[3],prev.bottom[4],prev.left[5],prev.left[6],prev.bottom[7],prev.left[8]],
          bottom: [prev.bottom[0],prev.right[19],prev.bottom[2],prev.bottom[3],prev.right[22],prev.bottom[5],prev.bottom[6],prev.right[25],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, mid: prev.mid + 90 }));
      } else {
        setRubicByYZ(prev => ({...prev,
          top: [prev.left[8],prev.top[1],prev.top[2],prev.left[5],prev.top[4],prev.top[5],prev.left[2],prev.top[7],prev.top[8]],
          front: [prev.front[6],prev.front[3],prev.front[0],prev.front[7],prev.front[4],prev.front[1],prev.front[8],prev.front[5],prev.front[2]],
          right: [...black,...black, prev.right[18],prev.right[19],prev.top[6],prev.right[21],prev.right[22],prev.top[3],prev.right[24],prev.right[25],prev.top[0]],
          back: [...prev.back],
          left: [prev.left[0],prev.left[1],prev.bottom[2],prev.left[3],prev.left[4],prev.bottom[5],prev.left[6],prev.left[7],prev.bottom[8]],
          bottom: [prev.bottom[0],prev.bottom[1],prev.right[20],prev.bottom[3],prev.bottom[4],prev.right[23],prev.bottom[6],prev.bottom[7],prev.right[26]]
        }))
        setXYstyle((prev) => ({ ...prev, left: prev.left + 90 }));
      }
    } else {
      if (ind === 0 || ind === 3 || ind === 6) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.top[1],prev.left[6],prev.top[3],prev.top[4],prev.left[3],prev.top[6],prev.top[7],prev.left[0]],
          front: [...prev.front],
          right: [...black,...black, prev.top[8],prev.right[19],prev.right[20],prev.top[5],prev.right[22],prev.right[23],prev.top[2],prev.right[25],prev.right[26]],
          back: [prev.back[2],prev.back[5],prev.back[8],prev.back[1],prev.back[4],prev.back[7],prev.back[0],prev.back[3],prev.back[6]],
          left: [prev.bottom[0],prev.left[1],prev.left[2],prev.bottom[3],prev.left[4],prev.left[5],prev.bottom[6],prev.left[7],prev.left[8]],
          bottom: [prev.right[18],prev.bottom[1],prev.bottom[2],prev.right[21],prev.bottom[4],prev.bottom[5],prev.right[24],prev.bottom[7],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, right: prev.right + 90 }));
      } else if (ind === 4 || ind === 1 || ind === 7) {
        setRubicByYZ(prev => ({...prev,
          top: [prev.top[0],prev.left[7],prev.top[2],prev.top[3],prev.left[4],prev.top[5],prev.top[6],prev.left[1],prev.top[8]],
          front: [...prev.front],
          right: [...black,...black, prev.right[18],prev.top[7],prev.right[20],prev.right[21],prev.top[4],prev.right[23],prev.right[24],prev.top[1],prev.right[26]],
          back: [...prev.back],
          left: [prev.left[0],prev.bottom[1],prev.left[2],prev.left[3],prev.bottom[4],prev.left[5],prev.left[6],prev.bottom[7],prev.left[8]],
          bottom: [prev.bottom[0],prev.right[19],prev.bottom[2],prev.bottom[3],prev.right[22],prev.bottom[5],prev.bottom[6],prev.right[25],prev.bottom[8]]
        }))
        setXYstyle((prev) => ({ ...prev, mid: prev.mid + 90 }));
      } else {
        setRubicByYZ(prev => ({...prev,
          top: [prev.left[8],prev.top[1],prev.top[2],prev.left[5],prev.top[4],prev.top[5],prev.left[2],prev.top[7],prev.top[8]],
          front: [prev.front[6],prev.front[3],prev.front[0],prev.front[7],prev.front[4],prev.front[1],prev.front[8],prev.front[5],prev.front[2]],
          right: [...black,...black, prev.right[18],prev.right[19],prev.top[6],prev.right[21],prev.right[22],prev.top[3],prev.right[24],prev.right[25],prev.top[0]],
          back: [...prev.back],
          left: [prev.left[0],prev.left[1],prev.bottom[2],prev.left[3],prev.left[4],prev.bottom[5],prev.left[6],prev.left[7],prev.bottom[8]],
          bottom: [prev.bottom[0],prev.bottom[1],prev.right[20],prev.bottom[3],prev.bottom[4],prev.right[23],prev.bottom[6],prev.bottom[7],prev.right[26]]
        }))
        setXYstyle((prev) => ({ ...prev, left: prev.left + 90 }));
      }
    }
      }, 100);

  };
  let leftYZ = (ind) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:false,
      XY:false,
      YZ: true});
      setTimeout(() => {
         if (ind === 0 || ind === 3 || ind === 6) {
          setRubicByXZ(prev => ({...prev,
            top: [prev.front[0],prev.top[1],prev.top[2],prev.front[3],prev.top[4],prev.top[5],prev.front[6],prev.top[7],prev.top[8]],
            front: [prev.bottom[18],prev.front[1],prev.front[2],prev.bottom[21],prev.front[4],prev.front[5],prev.bottom[24],prev.front[7],prev.front[8]],
            right: [...prev.right],
            back: [prev.back[0],prev.back[1],prev.top[6],prev.back[3],prev.back[4],prev.top[3],prev.back[6],prev.back[7],prev.top[0]],
            left: [prev.left[2],prev.left[5],prev.left[8],prev.left[1],prev.left[4],prev.left[7],prev.left[0],prev.left[3],prev.left[6]],
            bottom: [...black,...black, prev.back[8],prev.bottom[19],prev.bottom[20],prev.back[5],prev.bottom[22],prev.bottom[23],prev.back[2],prev.bottom[25],prev.bottom[26]]
          }))
      setYZstyle((prev) => ({ ...prev, left: prev.left - 90 }));
    } else if (ind === 1 || ind === 4 || ind === 7) {
      setRubicByXZ(prev => ({...prev,
        top: [prev.top[0],prev.front[1],prev.top[2],prev.top[3],prev.front[4],prev.top[5],prev.top[6],prev.front[7],prev.top[8]],
        front: [prev.front[0], prev.bottom[19],prev.front[2],prev.front[3],prev.bottom[22],prev.front[5],prev.front[6],prev.bottom[25],prev.front[8]],
        right: [...prev.right],
        back: [prev.back[0],prev.top[7],prev.back[2],prev.back[3],prev.top[4],prev.back[5],prev.back[6],prev.top[1],prev.back[8]],
        left: [...prev.left],
        bottom: [...black,...black, prev.bottom[18], prev.back[7], prev.bottom[20],prev.bottom[21],prev.back[4],prev.bottom[23],prev.bottom[24],prev.back[1],prev.bottom[26]]
      }))
      setYZstyle((prev) => ({ ...prev, mid: prev.mid - 90 }));
    } else {
      setRubicByXZ(prev => ({...prev,
        top: [prev.top[0],prev.top[1],prev.front[2],prev.top[3],prev.top[4],prev.front[5],prev.top[6],prev.top[7],prev.front[8]],
        front: [prev.front[0],prev.front[1],prev.bottom[20],prev.front[3],prev.front[4],prev.bottom[23],prev.front[6],prev.front[7], prev.bottom[26]],
        right: [prev.right[6],prev.right[3],prev.right[0],prev.right[7],prev.right[4],prev.right[1],prev.right[8],prev.right[5],prev.right[2]],
        back: [prev.top[8],prev.back[1],prev.back[2],prev.top[5],prev.back[4],prev.back[5],prev.top[2],prev.back[7],prev.back[8]],
        left: [...prev.left],
        bottom: [...black,...black, prev.bottom[18],prev.bottom[19],prev.back[6],prev.bottom[21],prev.bottom[22],prev.back[3],prev.bottom[24],prev.bottom[25], prev.back[0]]
      }))
      setYZstyle((prev) => ({ ...prev, right: prev.right - 90 }));
    }
      }, 100);

  };
  let rightYZ = (ind) => {
    toggleControlersActive(false);
    setRubicActive({ XZ:false,
      XY:false,
      YZ: true});
      setTimeout(() => {
         if (ind === 0 || ind === 3 || ind === 6) {
          setRubicByXZ(prev => ({...prev,
            top: [prev.back[8],prev.top[1],prev.top[2],prev.back[5],prev.top[4],prev.top[5],prev.back[2],prev.top[7],prev.top[8]],
            front: [prev.top[0],prev.front[1],prev.front[2],prev.top[3],prev.front[4],prev.front[5],prev.top[6],prev.front[7],prev.front[8]],
            right: [...prev.right],
            back: [prev.back[0],prev.back[1],prev.bottom[24],prev.back[3],prev.back[4],prev.bottom[21],prev.back[6],prev.back[7],prev.bottom[18]],
            left: [prev.left[6],prev.left[3],prev.left[0],prev.left[7],prev.left[4],prev.left[1],prev.left[8],prev.left[5],prev.left[2]],
            bottom: [...black,...black, prev.front[0],prev.bottom[19],prev.bottom[20],prev.front[3],prev.bottom[22],prev.bottom[23],prev.front[6],prev.bottom[25],prev.bottom[26]]
          }))
      setYZstyle((prev) => ({ ...prev, left: prev.left + 90 }));
    } else if (ind === 1 || ind === 4 || ind === 7) {
      setRubicByXZ(prev => ({...prev,
        top: [prev.top[0],prev.back[7],prev.top[2],prev.top[3],prev.back[4],prev.top[5],prev.top[6],prev.back[1],prev.top[8]],
        front: [prev.front[0], prev.top[1],prev.front[2],prev.front[3],prev.top[4],prev.front[5],prev.front[6],prev.top[7],prev.front[8]],
        right: [...prev.right],
        back: [prev.back[0],prev.bottom[25],prev.back[2],prev.back[3],prev.bottom[22],prev.back[5],prev.back[6],prev.bottom[19],prev.back[8]],
        left: [...prev.left],
        bottom: [...black,...black, prev.bottom[18], prev.front[1], prev.bottom[20],prev.bottom[21],prev.front[4],prev.bottom[23],prev.bottom[24],prev.front[7],prev.bottom[26]]
      }))
      setYZstyle((prev) => ({ ...prev, mid: prev.mid + 90 }));
    } else {
      setRubicByXZ(prev => ({...prev,
        top: [prev.top[0],prev.top[1],prev.back[6],prev.top[3],prev.top[4],prev.back[3],prev.top[6],prev.top[7],prev.back[0]],
        front: [prev.front[0],prev.front[1],prev.top[2],prev.front[3],prev.front[4],prev.top[5],prev.front[6],prev.front[7], prev.top[8]],
        right: [prev.right[2],prev.right[5],prev.right[8],prev.right[1],prev.right[4],prev.right[7],prev.right[0],prev.right[3],prev.right[6]],
        back: [prev.bottom[26],prev.back[1],prev.back[2],prev.bottom[23],prev.back[4],prev.back[5],prev.bottom[20],prev.back[7],prev.back[8]],
        left: [...prev.left],
        bottom: [...black,...black, prev.bottom[18],prev.bottom[19],prev.front[2],prev.bottom[21],prev.bottom[22],prev.front[5],prev.bottom[24],prev.bottom[25], prev.front[8]]
      }))
      setYZstyle((prev) => ({ ...prev, right: prev.right + 90 }));
    }
      }, 100);
  };

  // props we gonna pass to controlers
  const control = { leftXZ, rightXZ, leftXY, rightXY, leftYZ, rightYZ };

  return (
    <div className="rubic-container">
      <div className='controlPanel'>
      <button
        onClick={handleAnimation}
        className="addTaskButton"
      >
        Move around!
      </button>
          <div className="up-down-nav">
          <div>   <img onMouseEnter={turnUp} onMouseOut={stop} className='moveup' src='/assets/images/arrow.svg' alt=''/>
          Up</div>
      <div className="left-right-nav">
      <img onMouseEnter={turnLeft} onMouseOut={stop} className='moveleft' src='/assets/images/arrow.svg' alt=''/>
      Left Right
       <img onMouseEnter={turnRight} onMouseOut={stop} className='moveright' src='/assets/images/arrow.svg' alt=''/>
      </div>
      <div>  Down 
      <img onMouseEnter={turnDown} onMouseOut={stop} className='movedown' src='/assets/images/arrow.svg' alt=''/>
</div>
        
      </div>
    </div>
      <div
        className="rubic-cube"
        style={{
          transform: `rotateX(${rubicStyles.X}deg) rotateY(${rubicStyles.Y}deg)`,
        }}
      >
        {numberOfRows.map((el) => (
          <>
          {rubicActive.XZ &&
            <RubicXZ
              el={el}
              rubicByXZ={rubicByXZ}
              oneCubeSize={oneCubeSize}
              XZstyle={XZstyle}
            />}
            {rubicActive.XY &&
            <RubicXY
              el={el}
              rubicByXY={rubicByXY}
              oneCubeSize={oneCubeSize}
              XYstyle={XYstyle}
            />}
            {rubicActive.YZ &&
          <RubicYZ
          el={el}
          rubicByYZ={rubicByYZ}
          oneCubeSize={oneCubeSize}
          YZstyle={YZstyle}
          />}
          </>
        ))}
        {controlersActive &&
        <Controlers
          rubicByYZ={rubicControlers}
          oneCubeSize={oneCubeSize}
          control={control}
        />}
      </div>
    </div>
  );
}

// <button className='addTaskButton'>Shuffle!</button>
// <button className='addTaskButton'>Solve!</button>


