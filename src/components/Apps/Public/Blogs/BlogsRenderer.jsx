import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import BlogContext from '../../../Contexts/BlogContext';
import BlogItem from './BlogItem';

export default function BlogsRenderer() {
    const navigate = useNavigate();
    const { blogs } = useContext(BlogContext);

    return (
        <div>
            <button onClick={() => navigate('/blogs/mine/')}>Go to My Blogs</button>
            {
                blogs && blogs.map((blog) => (<BlogItem key={blog.id} {...{ blog }} />))
            }
        </div>
    )
}
