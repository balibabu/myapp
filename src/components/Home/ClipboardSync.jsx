import React, { useContext } from 'react'
import ClipIcon from '../../images/ClipIcon'
import { ClipSync } from '../../http/User'
import { copyToClipboard } from '../../utility/utilities';
import VariableContext from '../Contexts/VariableContext';
import Tooltip from '../../utility/Tooltip/Tooltip';

export default function ClipboardSync(props) {
    const { notify } = useContext(VariableContext);

    async function clipClickHandler() {
        try {
            const content = await ClipSync(props.token)
            copyToClipboard(content);
            notify('Clipboard', 'synced', 'success')
        } catch (error) {
            notify('Clipboard Error', 'check console for details', 'danger');
        }
    }
    return (
        <div className="navbar-brand"
            style={{ width: '30px', marginLeft: '10px', cursor: 'pointer' }}
            onClick={clipClickHandler}
        >
            <Tooltip text='sync clipboard'>
                <ClipIcon />
            </Tooltip>
        </div>
    )
}