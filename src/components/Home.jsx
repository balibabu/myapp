import React from 'react'
import Navbar from './Navbar/Navbar'
import TodoApp from '../Apps/Todo/TodoApp'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Navbar />
      <Link to='/todo'>Todo App</Link>
    </>
  )
}
