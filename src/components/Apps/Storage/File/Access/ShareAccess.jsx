import { useContext, useEffect, useState } from "react";
import ChatContext from "../../../../Contexts/ChatContext";
import SendIcon from "../../../../../images/SendIcon";
import { useNavigate, useParams } from "react-router-dom";
import StorageContext from "../../../../Contexts/StorageContext";
import { shareFile } from "./CRUD";
import AuthContext from "../../../../Contexts/AuthContext";
import VariableContext from "../../../../Contexts/VariableContext";
import { Confirm, copyToClipboard } from "../../../../../utility/utilities";
import { public_url } from "./utility";

export default function ShareAccess(props) {
    const { id } = useParams();
    const { files, setFiles } = useContext(StorageContext);
    const file = files && files.find((file) => file.id === parseInt(id));
    const [username, setUsername] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { users, fetchUserList } = useContext(ChatContext);
    const [, setInitialFetch] = useState(false);
    const { notify } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev && users === undefined) {
                fetchUserList();
            }
            return true;
        })
        // eslint-disable-next-line
    }, [])

    const onNameChange = (event) => {
        const inputValue = event.target.value;
        setUsername(inputValue);
        setFilteredUsers(users.filter((user) => user.username.toLowerCase().includes(inputValue.toLowerCase())));
    }

    async function shareHandler(anyone) {
        if (anyone) {
            if (!Confirm('are you sure? anyone can access your file')) { return }
            const access = await shareFile(token, file, setFiles, null, anyone, notify);
            copyToClipboard(public_url(access.anyoneKey));
            notify('Public Url created', 'and copied to clipboard', 'success');
        } else {
            const user = filteredUsers.find((usr) => usr.username === username);
            if (user) {
                if (!Confirm('are you sure? you want to share this file')) { return }
                shareFile(token, file, setFiles, user.id, anyone, notify);
                notify('File Shared', 'view permission granted', 'success');
            }
        }
        navigate(-1);
    }
    return (
        <div className='row justify-content-center p-2'>
            <div style={{ color: '#ccc' }} className='col-xl-6 col-lg-8 col-md-9 col-12'>
                <div>{file && file.title}</div>
                <div className='d-grid my-2'>
                    <button className='btn btn-primary btn-lg' onClick={() => shareHandler(true)}>Create a public url</button>
                </div>
                <div className='d-flex justify-content-between bg-secondary px-3 pt-1'>
                    <h1>Share</h1>
                    <div style={{ width: '32px', color: 'blue' }} onClick={() => shareHandler(false)}><SendIcon /></div>
                </div>
                <div className='d-flex justify-content-between bg-secondary ps-3 py-1 mt-2'>
                    <div>username:</div>
                    <input value={username} onChange={onNameChange} type="text" style={inputStyle} className='border-bottom border-primary border-2 text-end' />
                </div>
                <div>
                    {filteredUsers.map((user) => (
                        <div key={user.id} className='text-end pt-1' onClick={() => setUsername(user.username)}>
                            {user.username}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


const inputStyle = {
    background: 'transparent',
    color: 'white',
    outline: 'none',
    border: 'none',
}
