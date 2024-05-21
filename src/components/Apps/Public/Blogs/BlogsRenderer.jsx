import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BlogsRenderer() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={()=>navigate('/blogs/create/')}>Create a new blog</button>
        </div>
    )
}
