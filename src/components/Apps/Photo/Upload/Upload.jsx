import React, { useContext } from 'react'
import PhotoContext from '../../../Contexts/PhotoContext'
import UploadRow from './UploadRow';

export default function Upload() {
    const { selectedImages, compress, setCompress, upload, progress, current, setImages } = useContext(PhotoContext);
    return (
        <div className='d-flex justify-content-center'>
            <div className='text-white col-md-8 col-11'>
                <div className='fs-2'>Selected Images</div>

                {(selectedImages && selectedImages.length > 0) ?
                    <>
                        <div className="input-group mb-2 border border-2 rounded-3 border-info" style={{ width: '300px' }}>
                            <label className="input-group-text" onClick={() => setCompress(1)} >compression quality</label>
                            <input type="number" className='form-control' value={compress} onChange={(e) => setCompress(e.target.value)} min={0} max={1} step={0.1} />
                        </div>

                        {selectedImages.map((image, index) => {
                            return <div key={index}>
                                <UploadRow {...{ index, progress, image, current }} />
                            </div>
                        })}
                    </> :
                    <>
                        <input className='form-control my-2' type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />
                    </>
                }
                {selectedImages.length > 0 && <CustomeUploadButton progress={(current * 100 + progress) / selectedImages.length} clickHandler={upload} />}

            </div>
        </div>
    )
}
// style={{ height: '100px' }}

function CustomeUploadButton({ progress, clickHandler }) {
    let title = '';
    if (isNaN(progress) || progress === Infinity) { progress = 0 }
    if (progress === 0) {
        title = 'Upload All';
    } else if (progress < 100) {
        title = 'Uploading Images'
    } else {
        title = 'Processing Files';
    }
    return <div className="progress position-relative" style={{ height: '50px', cursor: 'pointer' }} onClick={progress === 0 ? clickHandler : () => { }}>
        <div className="progress-bar bg-success" style={{ width: `${progress === 0 ? 100 : progress}%` }}></div>
        <div className='position-absolute start-50 top-50 translate-middle text-black fs-2' style={{ whiteSpace: 'nowrap' }}>{title}</div>
    </div>
}