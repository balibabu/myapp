import React, { useContext, useState } from 'react'
import CustomModal from '../../utility/CustomModal';
import { sendMessage } from '../../http/chat';
import AuthContext from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MessageAdmin({ isModalOpen, setIsModalOpen }) {
    const { token } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    async function sendBtnHandler() {
        setContent('');
        await sendMessage(token, content, 1); // 1 and 4 are the admin's user id , 1 is very active then 4
        setIsModalOpen(false);
        navigate('/chat');
    }
    return (
        <CustomModal {...{ isModalOpen, setIsModalOpen, top: '50' }}>
            <textarea placeholder='type your message here'
                className='form-control mb-2' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} />
            <button className='btn btn-success form-control' onClick={sendBtnHandler} >Send</button>
        </CustomModal>
    )
}