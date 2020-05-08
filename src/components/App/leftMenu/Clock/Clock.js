import React, { useState, useEffect } from "react";
import ClockAnalog from './ClockAnalog'
import './Clock.scss'

const defaultDate = new Date();

export default function Clock() {
    const [date, setDate] = useState(defaultDate);

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()),
         1000);
        return () => {
            clearInterval(interval)
        }
    }, [])



    return (
        <div className='center'>
        <div id='analogClock'>
         <ClockAnalog date={date} />
        </div>

        </div>
    )
}
