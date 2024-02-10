export default function isMovable(folder, folders, moveIn) {
    // If moveIn is null, folder can be moved anywhere
    if (moveIn === null) {
        return true;
    }

    // If moveIn is set to the ID of another folder
    if (moveIn !== folder.id) {
        // Check if the folder is not movable inside its own children
        const isNotMovableInOwnChildren = !isFolderInDescendants(moveIn, folder.id, folders);
        return isNotMovableInOwnChildren;
    }

    // If moveIn is set to the same folder ID, return false (can't move into itself)
    return false;
}

// Function to check if a folder is a descendant of another folder
function isFolderInDescendants(folderId, descendantId, folders) {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) {
        return false;
    }
    if (folder.inside === descendantId) {
        return true;
    }
    if (folder.inside === null) {
        return false;
    }
    return isFolderInDescendants(folder.inside, descendantId, folders);
}
