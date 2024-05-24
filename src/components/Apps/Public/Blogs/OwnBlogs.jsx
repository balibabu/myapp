import React, { useContext } from 'react'
import BlogContext from '../../../Contexts/BlogContext';
import BlogItem from './BlogItem';
import { useNavigate } from 'react-router-dom';

export default function OwnBlogs() {
    const navigate = useNavigate();
    const { blogs, deleteHandler, username } = useContext(BlogContext);

    return (
        <div>
            <h1 className='text-info'>My Blogs</h1>
            {
                blogs && blogs.filter((blog) => blog.author === username).map((blog) => (<BlogItem key={blog.id} {...{ blog, deleteHandler, username, editHandler: () => navigate(`/blogs/create/${blog.id}`) }} />))
            }
            <button onClick={() => navigate('/blogs/create/new')}>Create a new blog</button>
        </div>
    )
}
