import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import StorageContext from '../../../Contexts/StorageContext';
import ChatContext from '../../../Contexts/ChatContext';
import VariableContext from '../../../Contexts/VariableContext';
import { shareFile } from './CRUD';

export default function Share() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notify } = useContext(VariableContext);
    const { token, files, setSharedByMe } = useContext(StorageContext);
    const { users, fetchUserList } = useContext(ChatContext);
    const [selectedFile, setSelectedFile] = useState(id);
    const [seletedUser, setSeletedUser] = useState('');
    const [, setInitialFetch] = useState(false);
    const foundFile = files && files.find((file) => file.id === parseInt(id));


    useEffect(() => {
        if (!users) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchUserList()
                }
                return true;
            })
        }
    }, [])

    const clickhandler = () => {
        if (selectedFile && seletedUser) {
            shareFile(token, selectedFile, setSharedByMe, seletedUser, false, notify);
        } else {
            alert('please select all the options');
        }
        navigate(-1);
    };

    return (
        <div className='bg-secondary'>
            <div>Title : {foundFile.title}</div>
            <div>Size : {foundFile.size} bytes</div>
            <div className="input-group mt-1 mb-2">
            </div>

            <div className="input-group mt-1 mb-2">
                <label className="input-group-text" htmlFor="select_file">
                    File
                </label>
                <select
                    className="form-select"
                    id="select_file"
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.value)}
                >
                    {files && files.map((file) => <option value={file.id} key={file.id}>{file.title}</option>)}
                </select>
                <label className="input-group-text" htmlFor="select_user">
                    Share with
                </label>
                <select
                    className="form-select"
                    id="select_user"
                    value={seletedUser}
                    onChange={(e) => setSeletedUser(e.target.value)}
                >
                    <option value='choice'>Choose..user</option>
                    {users && users.map((user) => <option value={user.id} key={user.id}>{user.username}</option>)}
                </select>
                <button className="btn btn-success form-control" onClick={clickhandler}>Proceed</button>
            </div>
        </div>
    )
}
