import axios from "axios";
import { saveAs } from 'file-saver';
import { API_BASE_URL } from "../../../../../http/_baseURL";
import { Confirm } from "../../../../../utility/utilities";
import progressHandler from "../../../Photo/utility/progressHandler";


export async function shareFile(token, file, setFiles, shareWithUserId, anyone) {
    const data = await allowFilePermission(token, file.id, shareWithUserId, anyone);
    if (data) {
        // setSharedByMe((prev) => [...prev, data]);
        setFiles((prev) => {
            const access = file.access || [];
            const uFile = { ...file, access: [...access, data] }
            return [...prev.map((f) => f.id === file.id ? uFile : f)]
        })
    }
    console.log(data);
    return data;
}





export async function removeShare(token, sharedId, setFiles, notify, file) {
    if (!Confirm('are you sure? you want to remove the permission')) { return }
    const status = await removeShareAPI(token, sharedId);
    if (status) {
        notify('File Permission', 'permission revoked', 'success');
        setFiles((prev) => {
            const uFile = { ...file, access: [...file.access.filter((access) => access.id !== sharedId)] }
            return [...prev.map((file) => file.id === uFile.id ? uFile : file)];
        })
    } else {
        notify('File Permission', 'failed to revoke permission', 'danger');
    }
}


export async function removeShareAPI(token, id) {
    console.log('removeShareAPI');
    try {
        const response = await axios.delete(`${API_BASE_URL}/storage/revoke/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (response.status === 204) {
            return true;
        } else {
            console.error(`Request failed with status ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}





export async function allowFilePermission(token, fileId, shareWithUserId, anyone) {
    console.log('allowFilePermission');
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/share/`,
            { file: fileId, anyone, sharedWith: shareWithUserId }, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        if (error.response.status === 409) {
            alert('permission already exist');
        } else {
            console.error(error);
        }
    }
}


export async function downloadSharedFilePublicKey(publickey,setProgressList,filename) {
    const response = await axios.get(`${API_BASE_URL}/storage/dsf/${publickey}/`);
    console.log(response.data);
    saveFileChunks(response.data,publickey,setProgressList,filename);
}

function saveFileChunks(chunkIds,publickey,setProgressList,filename){
    const blobs = {};
    let count = 0;
    setProgressList(new Array(chunkIds.length).fill(0));
    for (let i = 0; i < chunkIds.length; i++) {
        donwloadChunk(publickey,chunkIds[i], setProgressList, i).then((chunk) => {
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

async function donwloadChunk(publickey,chunkId, setProgressList, index) {
    const response = await axios.get(`${API_BASE_URL}/storage/dsf/${publickey}/${chunkId}`, {
        onDownloadProgress: (progressEvent) => {
            progressHandler(setProgressList, index, (progressEvent.progress * 100).toFixed(0));
        },
        responseType: 'blob',
    });
    return response.data;
}