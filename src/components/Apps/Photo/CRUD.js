import { saveAs } from 'file-saver';
import { downloadImage } from '../../../http/Photo';


export async function saveImage(photo) {
    console.log(photo.url);
    saveAs(photo.url, photo.oname);
}

export async function downloadFullImage(photo, token, setPhotos) {
    const s = await getBlobSizeFromURL(photo.url);
    if (s < 10_000) {
        const data = await downloadImage(token, photo.id);
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