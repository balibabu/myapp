import React from 'react'
import Navbar from './Navbar/Navbar'
import { Link } from 'react-router-dom'
import notepadIcon from '../../images/notepad.jpg'
import todoIcon from '../../images/todo.png'
import simonIcon from '../../images/simon.png'
import AppName from '../../utility/AppName'

export default function Home() {
	return (
		<div style={{ backgroundColor: "rgb(54, 54, 54)", height: "100vh" }}>
			<Navbar />
			<div className="container-fluid d-flex">
				<Link to='/notepad' style={{ textDecoration: 'none' }}><AppName image={notepadIcon} appname='Notepad' /></Link>
				<Link to='/todo' style={{ textDecoration: 'none' }}><AppName image={todoIcon} appname='Todo' /></Link>
				<Link to='/simon-game' style={{ textDecoration: 'none' }}><AppName image={simonIcon} appname='Simon' /></Link>
			</div>
		</div>
	)
}
