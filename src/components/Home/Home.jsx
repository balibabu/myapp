import React from 'react'
import { Link } from 'react-router-dom'
import notepadIcon from '../../images/notepad.png'
import todoIcon from '../../images/todo.png'
import chatIcon from '../../images/chat.png'
import simonIcon from '../../images/simon.png'
import expenseIcon from '../../images/expense.png'
import linkIcon from '../../images/link.png'
import AppName from '../../utility/AppName'
import Navbar from './Navbar'

export default function Home() {
	return (
		<div style={{ backgroundColor: "rgb(54, 54, 54)", height: "100vh" }}>
			<Navbar />
			<div className="container-fluid d-flex flex-wrap">
				<Link to='/chat' style={{ textDecoration: 'none' }}><AppName image={chatIcon} appname='Messenger' /></Link>
				<Link to='/notepad' style={{ textDecoration: 'none' }}><AppName image={notepadIcon} appname='Notepad' /></Link>
				<Link to='/todo' style={{ textDecoration: 'none' }}><AppName image={todoIcon} appname='Todo' /></Link>
				<Link to='/expense' style={{ textDecoration: 'none' }}><AppName image={expenseIcon} appname='Expenses' /></Link>
				<Link to='/simon-game' style={{ textDecoration: 'none' }}><AppName image={simonIcon} appname='Simon' /></Link>
				<Link to='/link-short' style={{ textDecoration: 'none' }}><AppName image={linkIcon} appname='Shortener' /></Link>
			</div>
		</div>
	)
}
