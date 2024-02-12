import React, { useContext } from 'react'
import ClipIcon from '../../images/ClipIcon'
import { ClipSync } from '../../http/User'
import VariableContext from '../Contexts/VariableContext';
import ToastDialog from '../../utility/ToastDialog';
import { copyToClipboard } from '../../utility/utilities';

export default function ClipboardSync(props) {
    const { showToast } = useContext(VariableContext);

    async function clipClickHandler() {
        const content = await ClipSync(props.token)
        copyToClipboard(content);
        showToast('done', 'primary')
    }
    return (
        <div className="navbar-brand" style={{ width: '30px', marginLeft: '10px', cursor:'pointer' }}
            onClick={clipClickHandler}
        >
            <ClipIcon />
            <ToastDialog />
        </div>
    )
}