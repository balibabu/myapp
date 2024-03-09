import React, { useContext, useState } from 'react'
import { uploadImages } from '../../../http/Photo';
import AuthContext from '../../Contexts/AuthContext';
import Uploadbar from './Header/Uploadbar';
import UploadIcon from '../../../images/UploadIcon';
import { useNavigate } from 'react-router-dom';
import PhotoContext from '../../Contexts/PhotoContext';

export default function Header() {
    const { token } = useContext(AuthContext);
    const { setPhotos } = useContext(PhotoContext);
    const [files, setFiles] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleInputChange = (event) => {
        const sel_files = event.target.files;
        setFiles(sel_files);
    };

    async function uploadhandler() {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        const res = await uploadImages(formData, token, setProgress);
        setPhotos((prev) => {
            const modifiedResult = []
            for (let i = 0; i < files.length; i++) {
                modifiedResult.push({ ...res[i], url: URL.createObjectURL(files[i]) })
            }
            return [...prev, ...modifiedResult];
        })
        setProgress(0);
        setFiles(null);
    }

    return (
        <div className="row m-0 mb-2">
            {progress === 0 ?
                <>
                    <Uploadbar {...{ handleInputChange, uploadhandler }} />
                </>
                :
                <div className='position-fixed z-3'>
                    <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{`${progress < 100 ? progress + '%' : 'processing'}`}</div>
                    </div>
                </div>
            }

        </div>
    )
}
