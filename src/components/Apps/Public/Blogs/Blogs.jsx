import React from 'react'
import CreateBlog from './create/CreateBlog'
import BlogsRenderer from './BlogsRenderer'
import { Route, Routes } from 'react-router-dom'
import Editor from './create/Editor'

export default function Blogs() {
    return (
        <Routes>
            <Route path="/" element={<BlogsRenderer />} />
            <Route path="create/" element={<CreateBlog />} />
            <Route path="editor/" element={<Editor />} />
        </Routes>
    )
}
