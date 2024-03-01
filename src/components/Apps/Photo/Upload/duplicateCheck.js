export function duplicateCheck(photos,photo) {
    const status=photos.some(_photo=>_photo.oname===photo.name);
    if(status){
        const confirmDelete = window.confirm("Photo already exits, do you want to upload it again?");
        if (!confirmDelete) { return false; }
    }
    return true;
}
