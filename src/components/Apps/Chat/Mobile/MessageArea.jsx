import React, { useEffect } from 'react'

export default function MessageArea(props) {

    return (
        <>
            <button onClick={()=>props.setActiveUser(null)}>{"<-"}</button>
            <div>{props.activeUser.username}</div>
        </>
    )
}
