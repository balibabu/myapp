import React from 'react'
import CreateBlog from './create/CreateBlog'
import BlogsRenderer from './BlogsRenderer'
import { Route, Routes, useParams } from 'react-router-dom'
import Editor from './create/Editor'
import OwnBlogs from './OwnBlogs'

export default function Blogs() {

    return (
        <Routes>
            <Route path="/" element={<BlogsRenderer />} />
            <Route path="mine/" element={<OwnBlogs />} />
            <Route path="create/:blogId" element={<CreateBlog />} />
            <Route path="editor/" element={<Editor />} />
        </Routes>
    )
}
