export default function FilePresence(file,files) {
    
    const status=files.some(_file=>_file.originalName===file.name);
    if(status){
        const confirmDelete = window.confirm("File already present, do you want to upload it again?");
        if (!confirmDelete) { return false; }
    }
    return true;
}
