import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhotoContext from '../../../Contexts/PhotoContext';
import Details from './Details';
import Image from './Image';
import { downloadFullImage, fetchNsetThumbUrl, saveImage } from '../utility/CRUD';
import AuthContext from '../../../Contexts/AuthContext';
import Progress from '../../../Shared/Progress';
import { deletePhotos } from '../../../../http/Photo';
import { Confirm } from '../../../../utility/utilities';

export default function ShowImage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [photo, setPhoto] = useState({});
    const { photos, setPhotos } = useContext(PhotoContext);
    const { token } = useContext(AuthContext);
    const [fullQuality, setFullQuality] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const foundPhoto = photos.find((photo) => photo.id === parseInt(id));
        if (!foundPhoto.url) {
            fetchNsetThumbUrl(foundPhoto, setPhotos, token);
        }
        if (fullQuality) {
            downloadFullImage(foundPhoto, token, setPhotos, setProgress);
        }
        setPhoto(foundPhoto);
    }, [id, photos, fullQuality])

    const downloadBtnhandler = async () => {
        await downloadFullImage(photo, token, setPhotos, setProgress);
        setTimeout(() => {
            setPhoto((prev) => {
                saveImage(prev);
                return prev;
            })
        }, 500);
    }
    const deleteBtnHandler = async () => {
        const op = Confirm('Do you want to delete this photo?');
        if (!op) { return; }
        navigate(-1);
        const status = await deletePhotos(token, photo.id);
        if (status) {
            setPhotos((prev) => prev.filter((_photo) => _photo.id !== photo.id));
        }
    }

    return (
        <div className='row m-0' >
            <div className='col p-0'>
                {(progress > 0 && progress < 100) ?
                    <Progress {...{ progress, title: 'downloading full quality', bg: 'success', css: 'm-1' }} /> :
                    <Controls {...{ fullQuality, setFullQuality, downloadBtnhandler, showInfo, setShowInfo, deleteBtnHandler }} />
                }
                <Image {...{ photo, photos }} />
            </div>
            {showInfo &&
                <div className='col-md-4 bg-secondary overflow-auto custom-scrollbar'>
                    <Details {...{ photo }} />
                </div>
            }
        </div>
    )
}

function Controls({ fullQuality, setFullQuality, downloadBtnhandler, showInfo, setShowInfo, deleteBtnHandler }) {
    return (
        <div className='bg-info d-flex' style={{ cursor: 'pointer' }}>
            <div className='pe-3'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" checked={fullQuality} onChange={() => setFullQuality(!fullQuality)} />
                    Full Quality
                </div>
            </div>
            <div className='pe-3' onClick={downloadBtnhandler}>download</div>
            <div className='pe-3' onClick={deleteBtnHandler}>delete</div>
            <div onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide ' : 'show '}info</div>
        </div>
    );
}











