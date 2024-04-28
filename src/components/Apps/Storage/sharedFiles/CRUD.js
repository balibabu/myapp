import axios from "axios";
import { API_BASE_URL } from "../../../../http/_baseURL";
import progressHandler from "../../Photo/utility/progressHandler";
import { saveAs } from 'file-saver';

export async function sharedFileDownloader(token, sharedId, filename, setProgressList) {
    const response = await axios.get(`${API_BASE_URL}/storage/dsf/${sharedId}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
    saveFileChunks(response.data, sharedId, setProgressList, filename, token);

}

function saveFileChunks(chunkIds, sharedId, setProgressList, filename, token) {
    const blobs = {};
    let count = 0;
    setProgressList(new Array(chunkIds.length).fill(0));
    for (let i = 0; i < chunkIds.length; i++) {
        donwloadChunk(sharedId, chunkIds[i], setProgressList, i, token).then((chunk) => {
            blobs[i] = chunk;
            count++;
            if (count === chunkIds.length) {
                const orderedBlobs = []
                for (let j = 0; j < chunkIds.length; j++) {
                    orderedBlobs.push(blobs[j]);
                }
                saveAs(new Blob(orderedBlobs), filename);
                setProgressList([])
            }
        })
    }
}

async function donwloadChunk(sharedId, chunkId, setProgressList, index, token) {
    const response = await axios.get(`${API_BASE_URL}/storage/dsf/${sharedId}/${chunkId}`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
        onDownloadProgress: (progressEvent) => {
            progressHandler(setProgressList, index, (progressEvent.progress * 100).toFixed(0));
        },
        responseType: 'blob',
    });
    return response.data;
}