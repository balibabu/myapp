import React from 'react'
import ThreeDots from '../../../../images/ThreeDots'

export default function Dropdown({ deleteHandler, downLoadhandler, cutHandler }) {
    return (
        <div className="dropdown" style={{ cursor: 'pointer', zIndex: 10 }}>
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                <span className="dropdown-item " onClick={downLoadhandler}>Download</span>
                <span className="dropdown-item " onClick={cutHandler}>Cut</span>
                <span className="dropdown-item " onClick={deleteHandler}>Delete</span>
            </ul>
        </div>
    )
}
