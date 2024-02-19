import React from 'react';

function AppName(props) {
    return (
        <>
            <div className="card text-center border-0 m-2 -2" >
                <img src={props.image} style={{ height: "100px" }} className="card-img-top p-1" alt={props.appname} />
                <div className="card-body p-0">
                    <hr className='m-0' />
                    <b className="card-text" style={{whiteSpace:'nowrap',overflow:'hidden'}}>{props.appname}</b>
                </div>
            </div>
        </>
    );
}

export default AppName;