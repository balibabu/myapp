import Compressor from 'compressorjs';

export async function ImageCompressor(file, quality) {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            retainExif: true,
            quality:parseFloat(quality),
            maxWidth: 4000,
            maxHeight: 4000,
            success(result) {
                resolve(result);
            },
            error(err) {
                console.log(err.message);
                reject(false);
            },
        });
    })
}