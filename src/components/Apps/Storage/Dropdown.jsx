import React from 'react'
import ThreeDots from '../../../images/ThreeDots'

export default function Dropdown({ deleteHandler,downLoadhandler }) {
    return (
        <div className="dropdown" style={{cursor: 'pointer'}}>
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <a className="dropdown-item " onClick={deleteHandler}>Delete</a>
                </li>
                <li>
                    <a className="dropdown-item " onClick={downLoadhandler}>Download</a>
                </li>
            </ul>
        </div>
    )
}
