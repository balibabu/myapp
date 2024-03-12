import React, { useContext, useState } from 'react'
import LoadingUI from '../../../../utility/LoadingUI';
import fileImg from '../../../../images/file.png';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import Dropdown from './Dropdown';
import { fileDownloader, onDelete } from './FileCRUD';
import IntelligentSize from '../extra/IntelligentSize';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';
import { useNavigate } from 'react-router-dom';


export default function FileItem(props) {
    const { loadingFileItem, SetloadingFileItem } = useContext(StorageContext);
    const { token } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [downloadFileId, setDownloadFileId] = useState(null);
    const { setFiles } = useContext(StorageContext);
    const [isCutted, setIsCutted] = useState(false);
    const navigate = useNavigate();

    const deleteHandler = async () => {
        onDelete(props.file.id, token, SetloadingFileItem, setFiles);
    }

    const downLoadhandler = async () => {
        setDownloadFileId(props.file.id);
        await fileDownloader(token, props.file.id, props.file.title, setProgress);
        setDownloadFileId(null);
        setProgress(0);
    }

    const cutHandler = () => {
        props.setCut([props.file, 'file']);
        setIsCutted(true);
    }

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' style={{ position: "relative", opacity: (loadingFileItem === props.file.id || isCutted) ? "50%" : "" }}>
            {loadingFileItem === props.file.id && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoadingUI width="40px" />
            </div>}
            <div className='mt-2 p-2 rounded-3 bg-info'>
                <div className='d-flex justify-content-between'>
                    <div className='col-1'>
                        <img className='rounded-3' src={fileImg} alt="type" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                    <div className='col-10 ps-2' onClick={() => navigate(`/storage/open/${props.file.id}`)}>
                        <div className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap", cursor: 'pointer' }}>{props.file.title}</div>
                        {downloadFileId === props.file.id && <DownloadingUI progress={progress} />}
                        <div className='d-flex justify-content-between'>
                            <small className='text-secondary pt-2' style={{ fontSize: "10px" }}>{convertUtcToLocal(props.file.timestamp).toString()}</small>
                            <div className='text-secondary' style={{ fontSize: "14px" }}>{IntelligentSize(props.file.size)}</div>
                        </div>
                    </div>
                    <Dropdown deleteHandler={deleteHandler} downLoadhandler={downLoadhandler} cutHandler={cutHandler} />
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