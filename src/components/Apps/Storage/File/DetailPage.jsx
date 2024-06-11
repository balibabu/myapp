import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import StorageContext from '../../../Contexts/StorageContext';
import IntelligentSize from '../extra/IntelligentSize';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import { get_users_anyonekey, public_url } from './Access/utility';
import { copyToClipboard } from '../../../../utility/utilities';
import VariableContext from '../../../Contexts/VariableContext';
import PublicKeyUi from './Access/PublicKeyUi';

export default function DetailPage() {
    const { id } = useParams();
    const { files } = useContext(StorageContext);
    const [file, setFile] = useState({});
    const [users, anyoneKeys] = get_users_anyonekey(file);

    useEffect(() => {
        const foundFile = files && files.find((file) => file.id === parseInt(id));
        if (foundFile) { setFile(foundFile) }
    }, [files])
    return (
        <div style={{ color: '#ccc' }} className='p-3'>
            <div className='fs-2'>{file.title}</div>
            <div>size: {IntelligentSize(file.size)} [{file.size} bytes]</div>
            <div>uploaded on: {convertUtcToLocal(file.timestamp)}</div>
            <div className='fs-3 mt-3'>Who has Access</div>
            {file.access ?
                <div>
                    {!users && <div className='fs-3 mt-3'>Users</div>}
                    {users && users.map((user, i) => <div key={i}>{user}</div>)}
                    <div className='fs-3 mt-3'>Public Keys</div>
                    {anyoneKeys && anyoneKeys.map((anyonekey, i) => <PublicKeyUi key={i} {...{ anyonekey }} />)}
                </div>
                :
                <div>
                    Not shared with anyone
                </div>
            }
        </div>
    )
    if (file) {
    }
    return <></>;
}