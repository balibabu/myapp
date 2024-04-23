import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import IntelligentSize from '../extra/IntelligentSize';
import Dropdown from './Dropdown';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import { updaterFile } from './FileCRUD';
import Multiprogress from '../extra/Multiprogress';

export default function FileInfo({ file, deleteHandler, downLoadhandler, cutHandler, token, setFiles, progressList }) {
    const navigate = useNavigate();
    const [isRenaming, setIsRenaming] = useState(false);
    const [title, setTitle] = useState(file.title.substring(0, file.title.lastIndexOf('.')));

    function save() {
        const newTitle = title + '.' + file.title.substring(file.title.lastIndexOf('.') + 1);
        updaterFile({ ...file, title: newTitle }, token, setFiles);
        setIsRenaming(false);
    }

    return (
        <>
            {
                isRenaming ?
                    <>
                        <input type='text' className='form-control mx-2' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </>
                    :
                    <>
                        <div className='col-10 ps-2' onClick={() => navigate(`/storage/open/${file.id}`)}>
                            <div className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap", cursor: 'pointer' }}>{file.title}</div>
                            <Multiprogress {...{ progressList, fontSize: '.7rem', css: '', height: '.8rem', h2: '.9rem', bg2: 'success' }} />
                            <div className='d-flex justify-content-between'>
                                <small className='text-secondary pt-2' style={{ fontSize: "10px" }}>{convertUtcToLocal(file.timestamp).toString()}</small>
                                <div className='text-secondary' style={{ fontSize: "14px" }}>{IntelligentSize(file.size)}</div>
                            </div>
                        </div>
                    </>
            }
            <Dropdown {...{ save, deleteHandler, downLoadhandler, cutHandler, isRenaming, setIsRenaming, navigate, file }} />
        </>
    )
}
