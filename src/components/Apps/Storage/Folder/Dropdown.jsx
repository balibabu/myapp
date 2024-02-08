import React from 'react'
import ThreeDots from '../../../../images/ThreeDots'

export default function Dropdown() {
    return (
        <div className='d-flex align-items-center'>
            <div style={{ width: '30px' }}>
                <ThreeDots />
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><span className="dropdown-item " >Rename</span></li>
                    <li><span className="dropdown-item " >Delete</span></li>
                </ul>
            </div>
        </div>
    )
}
