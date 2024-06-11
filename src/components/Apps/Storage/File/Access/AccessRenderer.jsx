import { useParams } from "react-router-dom";
import { RemoveIcon } from "../../../../../images/RemoveIcon";
import { useContext, useEffect, useState } from "react";
import StorageContext from "../../../../Contexts/StorageContext";
import { removeShare } from "./CRUD";
import AuthContext from "../../../../Contexts/AuthContext";
import VariableContext from "../../../../Contexts/VariableContext";
import { get_users_anyonekey } from "./utility";
import PublicKeyUi from "./PublicKeyUi";

export default function AccessRenderer(props) {
    const { id } = useParams();
    const { files, setFiles } = useContext(StorageContext);
    const { notify } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState({});

    useEffect(() => {
        const foundFile = files && files.find((file) => file.id === parseInt(id));
        if (foundFile) { setFile(foundFile) }
    }, [files])

    const [users, anyoneKeys] = get_users_anyonekey(file);
    function removeHandler(shareId) {
        removeShare(token, shareId, setFiles, notify, file);
    }

    return (
        <div className='row justify-content-center p-2'>
            <div style={{ color: '#ccc' }} className='col-xl-6 col-lg-8 col-md-9 col-12'>
                <h1>People With Access</h1>
                <div className="my-2">{file.title}</div>
                <h4>{file.access ? 'All Access' : 'No one has access to this file'}</h4>
                {file.access && file.access.map((access) => (
                    <Item key={access.id} {...{ title: access.sharedWith || access.anyoneKey, click: () => removeHandler(access.id) }} />
                ))}
                <div className="mt-4">
                    {anyoneKeys && anyoneKeys.map((anyonekey, i) => <PublicKeyUi key={i} {...{ anyonekey }} />)}
                </div>
            </div>
        </div>
    );
}

function Item(props) {
    return (
        <>
            <div className='d-flex px-4 justify-content-between'>
                <div className='ms-2'>{props.title.substr(0, 20)}</div>
                <hr className='col mx-4' />
                <div style={{ width: '20px', color: 'red' }} onClick={props.click}>
                    <RemoveIcon />
                </div>
            </div>
        </>
    );
}
