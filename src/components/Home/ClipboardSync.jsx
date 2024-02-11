import React, { useContext } from 'react'
import ClipIcon from '../../images/ClipIcon'
import { ClipSync } from '../../http/User'
import VariableContext from '../Contexts/VariableContext';
import ToastDialog from '../../utility/ToastDialog';

export default function ClipboardSync(props) {
    const { showToast } = useContext(VariableContext);
    return (
        <div className="navbar-brand" style={{ width: '30px', marginLeft: '10px' }}
            onClick={() => ClipSync(props.token, showToast)}
        >
            <ClipIcon />
            <ToastDialog />
        </div>
    )
}
