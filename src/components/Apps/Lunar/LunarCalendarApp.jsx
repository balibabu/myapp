import React from 'react';
// import fullMoonImg from '../../../images/fullMoon.jpg';
import fullMoonImg from '../../../images/moonResized.png';

const lunarCalendarStyle = {
    display: 'flex',
    flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    height: '100dvh', // Use 'vh' for viewport height
    color: 'aqua',
    backgroundImage: `url(${fullMoonImg})`,
    backgroundSize: 'cover', // Cover the entire container
    backgroundPosition: 'center', // Center the image
    zIndex: 1
};

const footerStyle = {
    marginTop: 'auto', // Push the footer to the bottom
    padding: '10px', // Add some padding for better visibility
};

export default function LunarCalendarApp() {
    return (
        <div style={lunarCalendarStyle}>
            <h1>Under Development</h1>
            <i>
                <small>I have got the data and idea to implement this.</small><br />
                <small>so it will be available soon</small>
            </i>
            <footer style={footerStyle}>Next Full Moon is on 25th January 2024</footer>
        </div>
    );
}