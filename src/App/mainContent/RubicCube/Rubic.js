import React from "react";
import "./Rubc.scss";
import Box from "./Box";
import { useState } from "react";
import { useEffect } from "react";
import RubicXZ from "./RubicXZ";
import RubicXY from "./RubicXY";
import RubicYZ from "./RubicYZ";

let black = ["black", "black", "black", "black", "black", "black"];
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
      setRubicStyles((prev) => ({ ...prev, Y: `${prev.Y - -3}` }));
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
            <RubicYZ el={el} rubicByYZ={rubicByYZ} oneCubeSize={oneCubeSize} />
            <RubicXZ el={el} rubicByXZ={rubicByXZ} oneCubeSize={oneCubeSize} />
            <RubicXY el={el} rubicByXY={rubicByXY} oneCubeSize={oneCubeSize} />
          </>
        ))}
      </div>
    </div>
  );
}

