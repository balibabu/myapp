import React, { useContext, useState } from 'react'
import axios from "axios";
import ImageFromBlob from './Test/ImageFromBlob'
import FileShare from './Test/FileShare'
import HomePage from './Test/HomePage'

export default function Test() {
    const [files, setFiles] = useState(null);
    const [blobs, setBlobs] = useState();
    const [imgurl, setImgurl] = useState();

    const handleInputChange = (event) => {
        const sel_files = event.target.files;
        setFiles(sel_files);
    };
    async function upload() {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        console.log(files);
        const res = await axios.post('http://127.0.0.1:8000/photu/upload/', formData, {
            headers: {
                'Authorization': `Token 43e954e5da28540b4738403a23f91d5aa324f6f3`,
            },
        });
        console.log(res);
    }
    async function getP() {
        const res = await axios.get('http://127.0.0.1:8000/photu/download/9/', {
            headers: {
                'Authorization': `Token 43e954e5da28540b4738403a23f91d5aa324f6f3`,
            },
        });
        console.log(res);
    }
    async function getP2() {
        const res = await axios.get('http://127.0.0.1:8000/photu/', {
            headers: {
                'Authorization': `Token 43e954e5da28540b4738403a23f91d5aa324f6f3`,
            },
        });
        console.log(res);
        // const b = blobs[2]
        // console.log(b)
        // const imageUrl = URL.createObjectURL(b);
        // setImgurl(imageUrl);
    }
    async function thumb() {
        const res = await axios.get('http://127.0.0.1:8000/photu/thumbnail/1707845635.jpg/', {
            headers: {
                'Authorization': `Token 43e954e5da28540b4738403a23f91d5aa324f6f3`,
            },
            responseType:'blob'
        });
        // const list = res.data.split('--\r\n--boundary').slice(0, -1)
        // console.log(typeof(list[0]));
        // dict_keys(['1707845635.jpg', '1707845639.jpg', '1707846344.png'])

        const b = new Blob([res.data],{type:'application/octet-stream'})
        const i = URL.createObjectURL(b);
        setImgurl(i);
    }

    return (
        <div>
            <ImageFromBlob />
            <FileShare />
            <input type='file' multiple onChange={handleInputChange} />
            <button onClick={upload}>Upload</button>
            <button onClick={getP}>get</button>
            <button onClick={getP2}>get2</button>
            <button onClick={thumb}>thumb</button>
            <img src={imgurl} alt='image' />

            {/* <HomePage /> */}
        </div>
    )
}
