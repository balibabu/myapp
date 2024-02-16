import React, { useState } from 'react';
import Compressor from 'compressorjs';

export const ImageUploader = () => {
    const [compressedImage, setCompressedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        compressImg(file);

        // new Compressor(file, {
        //     quality: 0.6, // adjust quality as needed
        //     success(result) {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(result);
        //         reader.onload = () => {
        //             setCompressedImage(reader.result);
        //             console.log(result.size);
        //         };
        //     },
        //     error(err) {
        //         console.error('Compression failed:', err);
        //     },
        // });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* {compressedImage && (
                <div>
                    <h2>Compressed Image</h2>
                    <img src={compressedImage} alt="Compressed" />
                </div>
            )} */}
        </div>
    );
};

export default ImageUploader;


async function compressImg(img) {
    const options = { quality: 0.6 };
    const result = await new Promise((resolve, reject) => {
        new Compressor(img, {
            ...options,
            success(compressedResult) {
                resolve(compressedResult);
            },
            error(err) {
                reject(err);
            }
        });
    });

    const reader = new FileReader();
    reader.readAsDataURL(result);
    const compressedDataURL = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    console.log(reader);
    console.log(result.size); // Log size of compressed image

    return compressedDataURL;
}
