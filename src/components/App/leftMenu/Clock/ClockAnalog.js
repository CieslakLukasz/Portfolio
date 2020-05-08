import React, { useState, useEffect } from "react";



const mins = {
  width: "0.15vw",
  height: "2.1vw",
  background: "rgb(70,70,70)",
  position: "absolute",
  top: "0.9vw",
  left: "2.8vw",
  zIndex: "3",
};
const hours = {
  width: "0.2vw",
  height: "1.5vw",
  background: "rgb(70,70,70)",
  position: "absolute",
  top: "1.5vw",
  left: "2.8vw",
  zIndex: "4",
};
const secs = {
  width: "0.1vw",
  height: "2.5vw",
  background: "rgb(87,3,5)",
  position: "absolute",
  top: "0.5vw",
  left: "2.8vw",
  zIndex: "2",
};

export default function ClockAnalog({ date }) {
  const [secound, setSecound] = useState({
    ...secs,
    transform: `rotate(${date.getSeconds() * 6}deg)`,
    transformOrigin: `50% 100%`,
  });
  const [minute, setMinute] = useState({
    ...mins,
    transform: `rotate(${(date.getMinutes() * 6 + date.getSeconds() * 0.1)}deg)`,
    transformOrigin: `50% 100%`,
  });
  const [hour, setHour] = useState({
    ...hours,
    transform: `rotate(${date.getHours() * 30 + date.getMinutes() * 0.5}deg)`,
    transformOrigin: `50% 100%`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecound((prev) => ({
        ...prev,
        transform: `rotate(${new Date().getSeconds() * 6}deg)`,
        transformOrigin: `50% 100%`,
      }));
      setMinute((prev) => ({
        ...prev,
        transform: `rotate(${
          new Date().getMinutes() * 6 + new Date().getSeconds()*0.1
        }deg)`,
        transformOrigin: `50% 100%`,
      }));
      setHour((prev) => ({
        ...prev,
        transform: `rotate(${
          new Date().getHours() * 30 + new Date().getMinutes() * 0.5
        }deg)`,
        transformOrigin: `50% 100%`,
      }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div style={hour} />
      <div style={minute} />
      <div style={secound} />
    </>
  );
}
