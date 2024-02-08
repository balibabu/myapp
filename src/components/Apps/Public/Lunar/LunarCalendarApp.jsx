import React, { useEffect, useState } from 'react';
import { getMoonData } from './api';
import getImageNumber from './getImage';
import DateTimeComponent from './DateTimeComponent';

let imgNum = '';
let FullNewMoon = '';
export default function LunarCalendarApp() {
    const [data, setData] = useState({});
    useEffect(() => {
        getMoonData(setData);
    }, [])

    if(data.illumination===1){
        FullNewMoon='fullMoon';
    }else if(data.illumination===0){
        FullNewMoon='newMoon';
    }else{
        imgNum = getImageNumber(data.phase, data.illumination);
    }
    return (
        <div style={{ ...lunarCalendarStyle, backgroundImage: `url(${process.env.PUBLIC_URL}/images/${FullNewMoon}.jpg)` }}>
            <h1>Lunar Phase</h1>
            <div>Illumination: {data.illumination}</div>
            {imgNum && <img src={process.env.PUBLIC_URL + `/images/${imgNum}.jpg`} alt={`${imgNum}`} style={imgStyle} />}
            <footer style={footerStyle}>
                <DateTimeComponent />
            </footer>
        </div>
    );
}


const lunarCalendarStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    color: 'aqua',
    height: '100dvh', 
    backgroundColor: 'black'
};

const footerStyle = {
    marginTop: 'auto',
    padding: '10px',
};

const imgStyle = {
    width: '20rem',
    position: 'fixed',
    top: "50%", left: "50%", transform: "translate(-50%, -50%)"
}