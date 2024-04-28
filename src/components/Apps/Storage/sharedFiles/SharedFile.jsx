import React, { useState } from 'react'
import IntelligentSize from '../extra/IntelligentSize';
import DownloadIcon from '../../../../images/storage/DownloadIcon';
import { sharedFileDownloader } from './CRUD';
import Multiprogress from '../extra/Multiprogress';

export default function SharedFile({ file, token, notify }) {

    const [progressList, setProgressList] = useState([]);

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 px-1'>
            <div className='mt-2 p-2 rounded-3 bg-secondary'>
                <div className='d-flex justify-content-between'>
                    <div className='col-11 ps-2'>
                        <div className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap", cursor: 'pointer' }}>{file.title}</div>
                        <div className='d-flex justify-content-between'>
                            <div className='text-white' style={{ fontSize: "14px" }}>{IntelligentSize(file.size)}</div>
                            <small className='text-white pe-3' style={{ fontSize: "14px" }}>shared by: {file.sharedBy}</small>
                        </div>
                    </div>
                    <DownloadFunction {...{ token, sharedId: file.sharedId, filename: file.title, setProgressList, notify }} />
                </div>
                <Multiprogress {...{ progressList, fontSize: '.7rem', css: '', height: '.8rem', h2: '.9rem', bg2: 'success' }} />
            </div>
        </div>
    )
}

function DownloadFunction({ token, sharedId, filename, setProgressList, notify }) {
    const [clicked, setClicked] = useState(false)
    function clickHandler() {
        sharedFileDownloader(token, sharedId, filename, setProgressList);
        setClicked(true);
        notify('Please Wait', 'downloading will start soon')
    }
    return (
        <>
            {!clicked &&
                <div className='col-1 pt-1' style={{ width: '2rem' }} onClick={clickHandler}>
                    <DownloadIcon />
                </div>
            }
        </>
    )
}