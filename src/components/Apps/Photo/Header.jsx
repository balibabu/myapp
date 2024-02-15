import React, { useContext, useState } from 'react'
import { uploadImages } from '../../../http/Photo';
import AuthContext from '../../Contexts/AuthContext';

export default function Header({ setPhotos }) {
    const { token } = useContext(AuthContext);
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
        <div className="row m-0 mt-3">
            {progress !== 0 &&
                <div>
                    <div className="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{`${progress}%`}</div>
                    </div>
                </div>
            }
            <div className="col">
                <div className='input-group'>
                    <input className='form-control' type="file" multiple onChange={handleInputChange} />
                    <button className="btn btn-info z-1" onClick={uploadhandler}>upload</button>
                </div>
            </div>
            <div className="col">
                <div className='input-group'>
                    <input className='form-control' type="text" placeholder='type to search' />
                    <button className='btn btn-primary z-1'>search</button>
                </div>
            </div>
            <div className="col-2 text-end">user pic</div>
        </div>
    )
}
