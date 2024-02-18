import React, { useContext, useState } from 'react'
import PhotoContext from '../../../Contexts/PhotoContext'
import UploadRow from './UploadRow';

export default function Upload() {
    const { selectedImages, setSelectedImages, compress, setCompress, upload, progress, setProgress, current,setImages } = useContext(PhotoContext);
    return (
        <div className='d-flex justify-content-center'>
            <div className='text-white col-md-8 col-11'>
                <div className='fs-2'>Selected Images</div>

                {(selectedImages && selectedImages.length > 0) ?
                    <>
                        <div className="input-group mb-2 border border-2 rounded-3 border-info" style={{ width: '300px' }}>
                            <label className="input-group-text" onClick={()=>setCompress(1)} >compression quality</label>
                            <input type="number" className='form-control' value={compress} onChange={(e) => setCompress(e.target.value)} min={0} max={1} step={0.1} />
                        </div>

                        {selectedImages.map((image, index) => {
                            return <div key={index}>
                                <UploadRow {...{ progress,image, current: current === index }} />
                            </div>
                        })}
                    </> :
                    <>
                        <input className='form-control my-2' type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />
                    </>
                }
                <button className='btn btn-success btn-full form-control' onClick={upload}>Upload All</button>
            </div>
        </div>
    )
}
