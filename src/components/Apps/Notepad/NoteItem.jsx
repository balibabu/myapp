import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import deleteImg from '../../../images/delete.png';
import convertUtcToLocal from '../../../utility/AutoLocalTime';
import LoadingUI from '../../../utility/LoadingUI';
import VariableContext from '../../Contexts/VariableContext';

export default function NoteItem(props) {
    const { loadingNoteItem, SetloadingNoteItem } = useContext(VariableContext);
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(`/notepad/edit/${props.note.id}`);
    }
    const deleteHandler = async (event) => {
        event.stopPropagation();
        SetloadingNoteItem(props.note.id);
        const status = await props.onDelete(props.note.id);
        if (!status) {
            SetloadingNoteItem(null);
        }
    }
    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' onClick={onClickHandler} style={{ cursor: 'pointer', position: "relative", opacity: loadingNoteItem === props.note.id ? "50%" : "" }}>
            {loadingNoteItem === props.note.id && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoadingUI width="40px" />
            </div>}
            <div className='mt-2 p-2 rounded-3' style={{ backgroundColor: props.note.color }}>
                <div className='d-flex justify-content-between'>
                    <h5 className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{props.note.title}</h5>
                    <button style={deleteButtonStyle} onClick={deleteHandler}>
                        <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
                    </button>
                </div>
                <small className='text-secondary' style={{ fontSize: "11px" }}>{convertUtcToLocal(props.note.created_time).toString()}</small>
            </div>
        </div>
    )
}

const deleteButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
};
const deleteImageStyle = {
    width: '20px',
    height: '20px',
};