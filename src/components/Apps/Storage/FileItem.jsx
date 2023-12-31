import React, { useContext, useState } from 'react'
import LoadingUI from '../../../utility/LoadingUI';
import VariableContext from '../../../global/VariableContext';
import fileImg from '../../../images/file.png';
import convertUtcToLocal from '../../../utility/AutoLocalTime';
import Dropdown from './Dropdown';
import AuthContext from '../../../global/AuthContext';
import { downloader, onDelete } from './FileCRUD';
import { downloadFile } from '../../../http/Storage';
import IntelligentSize from './extra/IntelligentSize';


export default function FileItem(props) {
    const { loadingFileItem, SetloadingFileItem, showToast, setFiles } = useContext(VariableContext);
    const { token, username } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [downloadFileId, setDownloadFileId] = useState(null);

    const deleteHandler = async (event) => {
        event.stopPropagation();
        onDelete(props.file.id, token, SetloadingFileItem, showToast, setFiles);
    }

    const downLoadhandler = async () => {
        // directDownload('https://raw.githubusercontent.com/balibabu/media/main/babu/1704104491.png', props.file.originalName)
        // downloader(props.file.url, props.file.originalName);
        // directDownload(props.file,username);
        showToast('Downloading file', 'success');
        setDownloadFileId(props.file.id);
        await downloadFile(token, props.file.id, props.file.originalName, setProgress);
        setDownloadFileId(null);
        setProgress(0);
    }

    const onClickHandler = () => {
        downloader(props.file, username);
    }

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' style={{ position: "relative", opacity: loadingFileItem === props.file.id ? "50%" : "" }}>
            {loadingFileItem === props.file.id && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoadingUI width="40px" />
            </div>}
            <div className='mt-2 p-2 rounded-3 bg-info'>
                <div className='d-flex justify-content-between'>
                    <div className='col-1' onClick={onClickHandler}>
                        <img className='rounded-3' src={fileImg} alt="type" style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }} />
                    </div>
                    <div className='col-10 ps-2' >
                        <div className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap" }}>{props.file.originalName}</div>
                        {downloadFileId === props.file.id && <DownloadingUI progress={progress} />}
                        <div className='d-flex justify-content-between'>
                            <small className='text-secondary pt-2' style={{ fontSize: "10px" }}>{convertUtcToLocal(props.file.timestamp).toString()}</small>
                            <div className='text-secondary' style={{ fontSize: "14px" }}>{IntelligentSize(props.file.fileSize)}</div>
                        </div>
                    </div>
                    <Dropdown deleteHandler={deleteHandler} downLoadhandler={downLoadhandler} />
                </div>
            </div>
        </div>
    )
}


const DownloadingUI = ({ progress }) => {
    return (
        <div className="progress" role="progressbar">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
            style={{ width: `${progress}%` }}>{`${progress}%`}</div>
        </div>
    );
}