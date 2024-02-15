import React, { useEffect, useState } from 'react'
import CustomModal from '../../../utility/CustomModal';
import { downloadFullImage, saveImage } from './CRUD';
import personIcon from '../../../images/contactProfile.jpg';


export default function Preview({ photo, token, setPhotos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            downloadFullImage(photo, token, setPhotos);
        }
    }, [isModalOpen])

    const photoClickHandler = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <div onClick={photoClickHandler}>
                <img src={photo.url ? photo.url : personIcon} alt={photo.oname} style={{}} className='px-1 py-1 bg-white col-12' />
            </div>
            <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} top='50'>
                <div className='position-relative'>
                    <div className='bg-white row m-1'>
                        <img src={photo.url} alt={photo.oname} className='px-1 py-1 bg-white' />
                    </div>
                    <button className='position-absolute z-3 top-0 end-0 btn btn-outline-secondary text-black' onClick={() => setIsModalOpen(false)}>x</button>
                </div>
                <div className='input-group mt-2'>
                    <button className='btn btn-success form-control' onClick={() => saveImage(photo)}>download</button>
                    <button className='btn btn-primary form-control disabled'>open full img in new tab</button>
                </div>
            </CustomModal>
        </>
    )
}