import { saveAs } from 'file-saver';
import { downloadImage, getAThumbnail } from '../../../http/Photo';


export async function saveImage(photo) {
    console.log(photo.url);
    saveAs(photo.url, photo.oname);
}

export async function downloadFullImage(photo, token, setPhotos, setProgress) {
    const s = await getBlobSizeFromURL(photo.url);
    if (s < 10_000) {
        const data = await downloadImage(token, photo.id, setProgress);
        if (data) {
            const blob = new Blob([data], { type: 'application/octet-stream' })
            const newUrl = URL.createObjectURL(blob);
            setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url: newUrl } : ph));
        }
    }
}

function getBlobSizeFromURL(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => resolve(blob.size))
            .catch(error => reject(error));
    });
}

export async function fetchNsetThumbUrl(photo, setPhotos, token) {
    const data = await getAThumbnail(token, photo.uname);
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url } : ph));
}