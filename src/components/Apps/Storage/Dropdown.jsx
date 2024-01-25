import React from 'react'
import ThreeDots from '../../../images/ThreeDots'

export default function Dropdown({ deleteHandler, downLoadhandler }) {
    return (
        <div className="dropdown" style={{ cursor: 'pointer' }}>
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <span className="dropdown-item " onClick={deleteHandler}>Delete</span>
                </li>
                <li>
                    <span className="dropdown-item " onClick={downLoadhandler}>Download</span>
                </li>
            </ul>
        </div>
    )
}
