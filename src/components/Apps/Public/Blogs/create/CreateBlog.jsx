import React, { useContext, useState } from 'react'
import Editor from './Editor'
import { useNavigate } from 'react-router-dom';
import BlogContext from '../../../../Contexts/BlogContext';
import axios from 'axios';
import AuthContext from '../../../../Contexts/AuthContext';
import { API_BASE_URL } from '../../../../../http/_baseURL';

export default function CreateBlog() {
    const navigate = useNavigate();
    const [reponame, setReponame] = useState('');
    const { files } = useContext(BlogContext);
    const { token } = useContext(AuthContext);


    async function deploy() {
        const response = await axios.post(`${API_BASE_URL}/blog/create/`, { reponame,index:files[0]['content'] }, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        console.log(response.data);
    }

    return (
        <div style={{ color: '#ccc' }}>
            <div>
                <span>https://1-blog.github.io/</span>
                <input type="text" style={inputStyle} value={reponame} onChange={(e) => setReponame(e.target.value)} />
            </div>
            <button onClick={() => navigate('/blogs/editor/')}>Create index.html</button><br />
            <button onClick={deploy}>Deploy</button>
            {/* <button onClick={() => console.log(files)}>log files</button> */}
        </div>
    )
}

const inputStyle = {
    background: 'transparent',
    color: 'white',
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid blue'
}