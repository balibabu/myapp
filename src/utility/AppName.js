import React from 'react';

function AppName(props) {
    return (
        <>
            <div className="card text-center border-0 m-2" >
                <img src={props.image} style={{height:"100px"}} className="card-img-top px-1 pt-1" alt={props.appname} />
                <div className="card-body p-0">
                    <b className="card-text text-truncate">{props.appname}</b>
                </div>
            </div>
        </>
    );
}

export default AppName;