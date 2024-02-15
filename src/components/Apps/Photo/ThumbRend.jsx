import React, { useContext, useEffect, useState } from 'react'
import ImgCard from './ImgCard';
import { pingServerAboutThumbnails } from '../../../http/Photo';
import AuthContext from '../../Contexts/AuthContext';

export default function ThumbRend({ photos }) {
    const [helpedServer, setHelpedServer] = useState(false);
    const { token } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        const ping = async () => {
            await pingServerAboutThumbnails(token);
            setHelpedServer(true);
        }
        setInitialFetch((prev) => {
            if (!prev) {
                ping();
            }
            return true;
        });

    }, [])

    return (
        <div className='row m-0 pt-2 px-1'>
            {helpedServer &&
                photos.map((photo) => {
                    return <ImgCard {...{ photo, token }} key={photo.id} />
                })
            }
        </div>
    )
}