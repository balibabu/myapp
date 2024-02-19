import JSZip from 'jszip';

export default function Zipping(files, setProgress = () => { }) {
    return new Promise((resolve, reject) => {
        const zip = new JSZip();
        [...files].forEach(file => zip.file(file.name, file));
        zip.generateAsync(
            { type: 'blob', streamFiles: true },
            (metadata) => setProgress(metadata.percent.toFixed(2))
        )
            .then((content) => resolve(content))
            .catch((error) => reject(error))
    });
}
