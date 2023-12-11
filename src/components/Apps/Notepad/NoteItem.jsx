import React from 'react'
import { useNavigate } from 'react-router-dom';
import deleteImg from '../../../images/delete.png';
import convertUtcToLocal from '../../../utility/AutoLocalTime';

export default function NoteItem(props) {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(`/notepad/edit/${props.note.id}`);
    }
    const deleteHandler=(event)=>{
        event.stopPropagation();
        props.onDelete(props.note.id);
    }
    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' onClick={onClickHandler}>
            <div className='bg-info mt-2 p-2 rounded-3'>
                <div className='d-flex justify-content-between'>
                    <h5 className='m-0'>{shortenTexts(props.note.title)}</h5>
                    <button style={deleteButtonStyle} onClick={deleteHandler}>
                        <img src={deleteImg} alt="Delete" style={deleteImageStyle} />
                    </button>
                </div>
                <small className='text-secondary' style={{fontSize:"11px"}}>{convertUtcToLocal(props.note.created_time).toString()}</small>
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


function shortenTexts(text, size = 30) {

    if (text.length <= size) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text.substr(0, size).charAt(0).toUpperCase() + text.substr(0, size).slice(1) + "...";
}