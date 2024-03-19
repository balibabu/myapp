import React from 'react'
import FolderIcon from '../../../../images/storage/FolderIcon'
import { useNavigate } from 'react-router-dom';

export default function SharedFolder(props) {
    const navigate = useNavigate();

    return (
        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 px-1' 
        onClick={()=>navigate('/storage/shared')} 
        style={{ cursor: 'pointer' }}>
            <div className='d-flex justify-content-between bg-secondary ps-2 rounded-2 my-1' >
                <div className='d-flex align-items-center'>
                    <div className='' style={{ width: '50px' }}><FolderIcon {...{stroke:props.stroke,strokeWidth:2}}/></div>
                    <div className='ps-2'>{props.title}</div>
                </div>
            </div>
        </div>
    )
}
