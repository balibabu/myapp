import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AppIcon(props) {
    const [order, ] = useState(localStorage.getItem(props.appname) === null ? 0 : parseInt(localStorage.getItem(props.appname)));
    const navigate = useNavigate();
    function appClick() {
        localStorage.setItem(props.appname,order+1)
        navigate(props.openApp);
    }
    return (
        <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 col-3 p-0 text-center mb-2 px-1'
            style={{ cursor: 'pointer',order:(-order) }}
            onClick={appClick}>
            <div className='rounded-3' style={{ backgroundColor: '#edede9' }}>
                <img src={props.image} alt={props.appname} className='col-12 p-2' />
                <hr className='p-0 m-0' />
                <div style={{whiteSpace:'nowrap',overflow:'hidden'}}>{props.appname}</div>
            </div>
        </div>
    );
}