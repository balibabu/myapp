import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BlogContext from '../../../../Contexts/BlogContext';

export default function CreateBlog() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const { resetValues, content, setContent, blogs, description, setDescription, reponame, setReponame, deployBlog, fetchOldValues, updateContent } = useContext(BlogContext);


    useEffect(() => {
        if (!isNaN(blogId) && content.length === 0) {
            fetchOldValues(blogId);
        }
    }, [])


    async function deploy() {
        const repos = blogs.map((blog) => blog.repo)
        if (isValidGitRepoName(reponame, repos)) {
            if (content) {
                deployBlog();
                navigate(-1);
            } else {
                alert('please give content for index.html');
            }
        } else {
            alert('please choose different url name');
        }
    }

    function update() {
        updateContent(blogId);
        navigate(-1);
    }


    return (
        <div style={{ color: '#ccc' }}>
            <div>
                <span>https://1-blog.github.io/</span>
                <input type="text" style={inputStyle} value={reponame} onChange={(e) => setReponame(e.target.value)} disabled={!isNaN(blogId)} />
            </div>
            <textarea className='col-12' style={inputStyle} rows={description.split('\n').length} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='give a short description about the blog' />
            <button onClick={() => navigate('/blogs/editor/')}>Create index.html</button>
            <span style={{ fontSize: '10px' }}>{content.slice(0, 20)}...</span><br />
            {
                isNaN(blogId) ? <button onClick={deploy}>Deploy</button> : <button onClick={update}>Update</button>
            }
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

function isValidGitRepoName(repoName, existingRepos = []) {
    const regex = /^(?!-)(?!.*--)[a-zA-Z0-9-_]+(?<!-)$/;
    if (!regex.test(repoName)) { return false }
    return !existingRepos.includes(repoName);
}