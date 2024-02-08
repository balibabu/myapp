import React from 'react'
import FolderIcon from '../../../../images/storage/FolderIcon'
import Dropdown from './Dropdown'
import { useNavigate } from 'react-router-dom';

export default function Folder({ folder }) {
    const navigate = useNavigate();
    function folderClickHandler(){
        navigate(`/storage/${folder.id}`);
    }
    return (
        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 px-1'>
            <div className='d-flex justify-content-between bg-secondary ps-2 rounded-2 my-1' >
                <div className='d-flex align-items-center' onClick={folderClickHandler} style={{cursor:'pointer'}}>
                    <div style={{ width: '50px' }}><FolderIcon /></div>
                    <div className='ps-2'>{folder.title}</div>
                </div>
                <Dropdown />
            </div>
        </div>
    )
}