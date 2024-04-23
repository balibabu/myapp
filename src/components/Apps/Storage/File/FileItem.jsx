import React, { useContext, useState } from 'react'
import LoadingUI from '../../../../utility/LoadingUI';
import fileImg from '../../../../images/file.png';
import { fileDownloader, onDelete } from './FileCRUD';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';
import FileInfo from './FileInfo';


export default function FileItem(props) {
    const { loadingFileItem, SetloadingFileItem } = useContext(StorageContext);
    const { token } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const { setFiles } = useContext(StorageContext);
    const [isCutted, setIsCutted] = useState(false);
    const [progressList, setProgressList] = useState([]);

    const deleteHandler = async () => {
        onDelete(props.file.id, token, SetloadingFileItem, setFiles, props.notify);
    }

    const downLoadhandler = async () => {
        await fileDownloader(token, props.file.id, props.file.title, props.notify, setProgressList);
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
                    <FileInfo {...{ file: props.file, deleteHandler, downLoadhandler, cutHandler, token, setFiles, progressList }} />
                </div>
            </div>
        </div>
    )
}