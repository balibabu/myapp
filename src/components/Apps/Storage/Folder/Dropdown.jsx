import React, { useContext } from 'react'
import ThreeDots from '../../../../images/ThreeDots'
import StorageContext from '../../../Contexts/StorageContext';
import { deleteFolder, updateFolder } from '../../../../http/Folder';
import AuthContext from '../../../Contexts/AuthContext';
import { Confirm } from '../../../../utility/utilities';

export default function Dropdown(props) {
    const { setFolders } = useContext(StorageContext);
    const { token } = useContext(AuthContext);

    async function deleteHandler() {
        if (Confirm(delete_message)) {
            const status = await deleteFolder(token, props.folder.id);
            if (status) {
                setFolders((prev) => prev.filter((folder) => folder.id !== props.folder.id));
            }
        }
    }

    async function renameHandler() {
        const updatedFolder = await updateFolder(token, { ...props.folder, title: props.title });
        setFolders((prev) => prev.map(folder => folder.id === updatedFolder.id ? updatedFolder : folder));
        props.setIsRenaming(false);
    }

    return (
        <div className='d-flex align-items-center'>
            <div style={{ width: '30px' }}>
                <ThreeDots />
                <ul className="dropdown-menu dropdown-menu-end">
                    {props.isRenaming ?
                        <li className="dropdown-item " onClick={renameHandler}>Save</li> :
                        <>
                            <li><span className="dropdown-item " onClick={() => props.setIsRenaming(true)}>Rename</span></li>
                            <li><span className="dropdown-item " onClick={props.cutHandler}>Cut</span></li>
                            <li><span className="dropdown-item " onClick={deleteHandler}>Delete</span></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}


const delete_message = `
Are you sure? 
Deleting non-empty folder wont delete files and folders inside it.
You may have to refresh the page for changes.
`