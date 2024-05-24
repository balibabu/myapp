import React from 'react'
import deleteImg from '../../../../images/delete.png';
import EditIcon from '../../../../images/EditIcon';

export default function BlogItem({ blog, deleteHandler, editHandler, username }) {
    const link = `https://1-blog.github.io/${blog.repo}/`
    return (
        <div className='bg-info p-1 m-1 px-2 d-flex justify-content-between'>
            <div>
                <div>{blog.description}</div>
                <a href={link} target="_blank">{link}</a>
                <div>Author: {blog.author}</div>
            </div>
            {username === blog.author && <div>
                <img src={deleteImg} style={{ width: "24px" }} alt='delete' onClick={() => deleteHandler(blog.id)} />
                <div style={{ width: "24px" }} onClick={() => editHandler(blog.id)}><EditIcon /></div>
            </div>}
        </div>
    )
}