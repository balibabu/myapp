import { downloadImage } from "../../../../http/Photo";

export default async function ThumLocalStore(photo,token) {
    // local storage of thumbnails
    let data = retrieveBlob(`photu-${photo.id}`);
    if (data === null) {
        data = await downloadImage(token, photo.id, 0); // 0 for thumbnail and 1 for original image
        storeBlob(`photu-${photo.id}`, data);
    }
    return data;
}



// Function to store a Blob in localStorage
function storeBlob(key, blob) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64Data = event.target.result;
        localStorage.setItem(key, base64Data);
    };
    reader.readAsDataURL(blob);
}

// Function to retrieve a Blob from localStorage
function retrieveBlob(key) {
    const base64Data = localStorage.getItem(key);
    if (base64Data === null) { return null }
    return dataURLtoBlob(base64Data); // You need to implement this function
}

function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}