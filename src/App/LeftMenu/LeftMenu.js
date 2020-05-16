import React from 'react';
import Clock from './Clock/Clock';
import './LeftMenu.scss';

export default function LeftMenu() {
    return (
        <div className='leftMenu'>

        <img src='/assets/images/aboutmephoto.jpg'/>
        <div>
        <h1>Łukasz Cieślak</h1>
        <h4>Junior Tester</h4>
        <h4>Junior Front-end Developer</h4>
        <p>
        Jako początkujący, pełen zapału tester i programista JavaScript, poszukuję możliwości do rozwoju.</p>
        </div>
        <Clock />
        </div>
    )
}
