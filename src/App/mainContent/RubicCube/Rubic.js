import React from "react";
import "./Rubc.scss";
import { useState } from "react";
import { useEffect } from "react";
import RubicXZ from "./RubicXZ";
import RubicXY from "./RubicXY";
import RubicYZ from "./RubicYZ";
import Controlers from "./Controlers";

let black = ["black", "black", "black", "black", "black", "black"];
let transparent = [
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
];
let topSide = ["red", "red", "red", "red", "red", "red", "red", "red", "red"];
let frontSide = [
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
];
let rightSide = [
  "green",
  "green",
  "green",
  "green",
  "green",
  "green",
  "green",
  "green",
  "green",
];
let backSide = [
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
];
let leftSide = [
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
];
let bottomSide = [
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
];

export default function Rubic() {
  const [numberOfRows] = useState([-1, 0, 1]);
  const [rubicByXZ, setRubicByXZ] = useState({
    top: [...topSide, ...black, ...black, ...black],
    front: [...frontSide],
    right: [...rightSide],
    back: [...backSide],
    left: [...leftSide],
    bottom: [...black, ...black, ...black, ...bottomSide],
  });
  const [rubicByXY, setRubicByXY] = useState({
    top: [...topSide],
    front: [...frontSide, ...black, ...black, ...black],
    right: [...rightSide],
    back: [...black, ...black, ...black, ...backSide],
    left: [...leftSide],
    bottom: [...bottomSide],
  });
  const [rubicByYZ, setRubicByYZ] = useState({
    top: [...topSide],
    front: [...frontSide],
    right: [...black, ...black, ...black, ...rightSide],
    back: [...backSide],
    left: [...leftSide, ...black, ...black, ...black],
    bottom: [...bottomSide],
  });
  const [rubicControlers] = useState({
    top: [...transparent],
    front: [...transparent],
    right: [...transparent, ...transparent, ...transparent],
    back: [...transparent],
    left: [...transparent, ...transparent, ...transparent],
    bottom: [...transparent],
  });
  let [oneCubeSize, setOneCubeSize] = useState(66);
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
      setRubicStyles((prev) => ({ ...prev, Y: `${prev.Y - 3}` }));
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
      setRubicStyles((prev) => ({ ...prev, X: `${prev.X - -3}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let turnDown = () => {
    setAnimation(false);
    let intervalId = setInterval(() => {
      setRubicStyles((prev) => ({ ...prev, X: `${prev.X - 3}` }));
    }, 100);
    setIntervalOne(intervalId);
  };
  let stop = () => {
    clearInterval(intervalOne);
  };
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

  let leftXZ = (ind) => {
    console.log(ind);
    if (ind === 0 || ind === 1 || ind === 2) {
      setXZstyle((prev) => ({...prev, left: prev.left + 90}));
    } else if (ind === 3 || ind === 4 || ind === 5) {
      setXZstyle((prev) => ({...prev, mid: prev.mid + 90}));
    } else {
      setXZstyle((prev) => ({...prev, right: prev.right + 90}));
    }
  };
  let rightXZ = (ind) => {
    console.log(ind);
    if (ind === 0 || ind === 1 || ind === 2) {
      setXZstyle((prev) => ({...prev, left: prev.left - 90}));
    } else if (ind === 3 || ind === 4 || ind === 5) {
      setXZstyle((prev) => ({...prev, mid: prev.mid - 90}));
    } else {
      setXZstyle((prev) => ({...prev, right: prev.right - 90}));
    }
  };
  let leftXY = (ind,site) => {
    if(site==='top'){
    if (ind === 0 || ind === 1 || ind === 2) {
      setXYstyle((prev) => ({...prev, right: prev.right - 90}));
    } else if (ind === 3 || ind === 4 || ind === 5) {
      setXYstyle((prev) => ({...prev, mid: prev.mid - 90}));
    } else {
      setXYstyle((prev) => ({...prev, left: prev.left - 90}));
    }}else{
      if (ind === 0 || ind === 3 || ind === 6) {
        setXYstyle((prev) => ({...prev, right: prev.right - 90}));
      } else if (ind === 4 || ind === 1 || ind === 7) {
        setXYstyle((prev) => ({...prev, mid: prev.mid - 90}));
      } else {
        setXYstyle((prev) => ({...prev, left: prev.left - 90}));
      }
    }
  };
  let rightXY = (ind, site) => {
    if(site==='top'){
    if (ind === 0 || ind === 1 || ind === 2) {
      setXYstyle((prev) => ({...prev, right: prev.right + 90}));
    } else if (ind === 3 || ind === 4 || ind === 5) {
      setXYstyle((prev) => ({...prev, mid: prev.mid + 90}));
    } else {
      setXYstyle((prev) => ({...prev, left: prev.left + 90}));
    }}else{
      if (ind === 0 || ind === 3 || ind === 6) {
        setXYstyle((prev) => ({...prev, right: prev.right + 90}));
      } else if (ind === 4 || ind === 1 || ind === 7) {
        setXYstyle((prev) => ({...prev, mid: prev.mid + 90}));
      } else {
        setXYstyle((prev) => ({...prev, left: prev.left + 90}));
      }
    }
  };
  let leftYZ = (ind) => {
    console.log(ind);
    if (ind === 0 || ind === 3 || ind === 6) {
      setYZstyle((prev) => ({...prev, left: prev.left - 90}));
    } else if (ind === 1 || ind === 4 || ind === 7) {
      setYZstyle((prev) => ({...prev, mid: prev.mid - 90}));
    } else {
      setYZstyle((prev) => ({...prev, right: prev.right - 90}));
    }
  };
  let rightYZ = (ind) => {
    console.log(ind);
    if (ind === 0 || ind === 3 || ind === 6) {
      setYZstyle((prev) => ({...prev, left: prev.left + 90}));
    } else if (ind === 1 || ind === 4 || ind === 7) {
      setYZstyle((prev) => ({...prev, mid: prev.mid + 90}));
    } else {
      setYZstyle((prev) => ({...prev, right: prev.right + 90}));
    }
  };

  const control = {leftXZ, rightXZ, leftXY, rightXY, leftYZ, rightYZ};

  return (
    <div className="rubic-container">
      <button
        onClick={handleAnimation}
        className="addTaskButton"
        style={{ width: "25%" }}
      >
        Click me!
      </button>
      <div className="left-right-nav">
        <span onMouseEnter={turnLeft} onMouseOut={stop}>
          {" "}
          &#11160;
        </span>{" "}
        <span onMouseEnter={turnRight} onMouseOut={stop}>
          {" "}
          &#11162;
        </span>
      </div>
      <div className="up-down-nav">
        <span onMouseEnter={turnUp} onMouseOut={stop}>
          {" "}
          &#11161;
        </span>{" "}
        <span onMouseEnter={turnDown} onMouseOut={stop}>
          {" "}
          &#11163;
        </span>
      </div>
      <div
        className="rubic-cube"
        style={{
          transform: `rotateX(${rubicStyles.X}deg) rotateY(${rubicStyles.Y}deg)`,
        }}
      >
{numberOfRows.map((el) => (
  <>
    <RubicYZ el={el} rubicByYZ={rubicByYZ} oneCubeSize={oneCubeSize} YZstyle={YZstyle}/>
    <RubicXZ el={el} rubicByXZ={rubicByXZ} oneCubeSize={oneCubeSize} XZstyle={XZstyle}/>
    <RubicXY el={el} rubicByXY={rubicByXY} oneCubeSize={oneCubeSize} XYstyle={XYstyle}/>

  </>
))}
        <Controlers
              rubicByYZ={rubicControlers}
              oneCubeSize={oneCubeSize}
              control={control}
            />
      </div>
    </div>
  );
}

