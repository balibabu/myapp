import React, { useContext, useEffect, useState } from 'react'
import PhotoContext from '../../../Contexts/PhotoContext';
import Selected from './Selected';
import { uploadImage } from '../utility/CRUD';
import FileInput from './FileInput';
import Progress from '../../../Shared/Progress';
import { averageProgress } from '../utility/progressHandler';

export default function Upload() {
    const { photos, selectedImages, setSelectedImages, setPhotos, token, progressList, setProgressList } = useContext(PhotoContext);

    useEffect(() => {
        const arrays = new Array(selectedImages.length).fill(0);
        setProgressList(arrays);
    }, [selectedImages])

    const uploadhandler = () => {
        uploadImage(selectedImages, setPhotos, token, setSelectedImages, photos, setProgressList);
    }

    const avProgress = averageProgress(progressList);

    return (
        <div className='container pt-3'>
            {selectedImages.length === 0 && <FileInput {...{ setSelectedImages }} />}
            {selectedImages.map((image, index) => <Selected key={index} {...{ image, progress: progressList[index] }} />)}
            {selectedImages.length > 0 && avProgress===0 && <>
                <button onClick={() => setSelectedImages([])}>clear</button>
                <button onClick={uploadhandler}>upload</button>
            </>}
            {progressList.length > 0 && <Progress {...{ title: 'total progress', progress: avProgress, height: '2rem' }} />}
        </div>
    )
}

