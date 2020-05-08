import React, { useEffect, useState } from "react";
import './Memory.scss'

const defaultRun = {
  time: 0,
  intervalId: false,
  laps: 1,
  count: 1,
  pairs:1,
};
export default function CounterWatch({ watch, counter, succesCounter, pairs ,turnBack}) {
  const [run, setRun] = useState(defaultRun);
  const [data, setData] = useState([]);

  //za kazdym razem gdy watch bedzie true odpaamy zegar
  useEffect(() => {
    watch ? start() : setRun((prev) => ({ ...prev, time: 0, count:0, pairs:0}))
  }, [watch]);

  useEffect(() => {
    if(succesCounter == pairs){
    laps();
    turnBack()}
    setRun((prev) => ({ ...prev, pairs: prev.pairs + 1 }));
  }, [succesCounter]);

  useEffect(() => {
    setRun((prev) => ({ ...prev, count: prev.count + 1 }));
  }, [counter]);

  const start = () => {
    let intervalId;
     run.intervalId
      ? clearInterval(run.intervalId)
      : (intervalId = setInterval(() => {
          setRun((prev) => ({ ...prev, time: prev.time + 1 }));
        }, 1000));
    setRun((prev) => ({ ...prev, intervalId }));
  };

  const laps = () => {
    clearInterval(run.intervalId);
    setRun((prev) => ({ ...prev, laps: prev.laps + 1 }));
    newData();
  };

  const newData = () => {
    setData((prev) => [...prev, run]);
    setRun((prev) => ({ ...prev, time: 0, intervalId: false, count:0, pairs:0}));
  };

  return (
    <>
      <h1>Time: {run.time} s</h1>
      <table className='score_table'>
        <tr>
          <th>Partia</th>
          <th>Ilosc par</th>
          <th>Czas</th>
          <th>Ilośc tur</th>
        </tr>
        {!data
          ? null
          : data.map((el) => (
              <tr key={el.laps}>
                <td>{el.laps}</td>
                <td>{el.pairs}</td>
                <td>{el.time}s</td>
                <td>{el.count}</td>
              </tr>
            ))}
      </table>
    </>
  );
}
