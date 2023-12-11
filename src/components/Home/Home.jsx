import React from 'react'
import Navbar from './Navbar/Navbar'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{backgroundColor: "rgb(54, 54, 54)",height:"100vh"}}>
      <Navbar />
      <Link to='/todo'>Todo App</Link><br />
      <Link to='/notepad'>Notepad</Link>
    </div>
  )
}
