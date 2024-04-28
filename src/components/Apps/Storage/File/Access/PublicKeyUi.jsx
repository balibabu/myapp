import React, { useContext } from 'react'
import { public_url } from './utility';
import VariableContext from '../../../../Contexts/VariableContext';
import { copyToClipboard } from '../../../../../utility/utilities';

export default function PublicKeyUi(props) {
    const { notify } = useContext(VariableContext);

    function copyPublicUrl(key) {
        const url = public_url(key);
        copyToClipboard(url)
        notify('Public Link Copied', url);
    }

    return (
        <div>
            <button className='btn btn-info btn-sm p-0 me-2' onClick={() => copyPublicUrl(props.anyonekey)}>copy public url</button>
            <span>{props.anyonekey}</span>
        </div>
    )
}
