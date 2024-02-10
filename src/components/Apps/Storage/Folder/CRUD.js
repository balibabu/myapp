import { updateFolder } from "../../../../http/Folder";

export async function updater(setFolders, token, newFolder) {
    const updatedFolder = await updateFolder(token, newFolder);
    setFolders((prev) => prev.map(folder => folder.id === updatedFolder.id ? updatedFolder : folder));
}