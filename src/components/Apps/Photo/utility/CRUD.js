import { saveAs } from 'file-saver';
import { downloadImage, uploadImages } from '../../../../http/Photo';
import { duplicateCheck } from './duplicateCheck';
import ThumLocalStore from './ThumLocalStore';

export async function saveImage(photo) {
    console.log(photo.url);
    saveAs(photo.url, photo.title);
}

export async function downloadFullImage(photo, token, setPhotos, setProgress) {
    const s = await getBlobSizeFromURL(photo.url);
    if (s < photo.size) {
        const data = await downloadImage(token, photo.id, 1, setProgress);
        if (data) {
            const blob = new Blob([data], { type: 'application/octet-stream' })
            const newUrl = URL.createObjectURL(blob);
            setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url: newUrl } : ph));
        }
    }
}

export function getBlobSizeFromURL(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => resolve(blob.size))
            .catch(error => reject(error));
    });
}

const initiatedFor = new Set();
export async function fetchNsetThumbUrl(photo, setPhotos, token) {
    if (initiatedFor.has(photo.id)) { return }
    initiatedFor.add(photo.id);

    const data = await ThumLocalStore(photo,token);
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url } : ph));
}


export async function uploadImage(selectedImages, setPhotos, token, setSelectedImages, photos, setProgressList) {
    let total = selectedImages.length;
    for (let i = 0; i < selectedImages.length; i++) {
        if (!duplicateCheck(photos, selectedImages[i])) { continue; }
        const formData = new FormData();
        formData.append('file', selectedImages[i])
        uploadImages(formData, token, setProgressList, i).then((res) => {
            setPhotos((prev) => [{ ...res, url: URL.createObjectURL(selectedImages[i]) }, ...prev]);
            total -= 1;
            if (total === 0) {
                setSelectedImages([]);
            }
        });
    }
}

