import React, { useState } from 'react'
import FolderIcon from '../../../../images/storage/FolderIcon'
import Dropdown from './Dropdown'
import { useNavigate } from 'react-router-dom';

export default function Folder({ folder, setCut }) {
    const [isRenaming, setIsRenaming] = useState(false);
    const [title, setTitle] = useState(folder.title);
    const navigate = useNavigate();

    function folderClickHandler() {
        navigate(`/storage/${folder.id}`);
    }

    function cutHandler() {
        setCut(folder)
    }

    return (
        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 px-1'>
            <div className='d-flex justify-content-between bg-secondary ps-2 rounded-2 my-1' >
                {isRenaming ?
                    <input type='text' className='form-control my-2' value={title} onChange={(e) => setTitle(e.target.value)} /> :
                    <>
                        <div className='d-flex align-items-center' onClick={folderClickHandler} style={{ cursor: 'pointer' }}>
                            <div style={{ width: '50px' }}><FolderIcon /></div>
                            <div className='ps-2'>{folder.title}</div>
                        </div>
                    </>
                }
                <Dropdown {...{ cutHandler, isRenaming, setIsRenaming, folder, title }} />
            </div>
        </div>
    )
}