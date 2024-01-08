import React from 'react'
import { Link } from 'react-router-dom'
import notepadIcon from '../../images/AppIcon/notepad.png'
import todoIcon from '../../images/AppIcon/todo.png'
import chatIcon from '../../images/AppIcon/chat.png'
import simonIcon from '../../images/AppIcon/simon.png'
import expenseIcon from '../../images/AppIcon/expense.png'
import linkIcon from '../../images/AppIcon/link2.png'
import lunarIcon from '../../images/AppIcon/lunar.png'
import storageIcon from '../../images/AppIcon/storage.png'
import photoIcon from '../../images/AppIcon/photoIcon.png'
import Navbar from './Navbar'
import AppName from './AppName'

export default function Home() {
	return (
		<div style={{ backgroundColor: "rgb(54, 54, 54)", height: "100dvh" }}>
			<Navbar />
			<div className="container-fluid d-flex flex-wrap">
				<Link to='/storage' style={{ textDecoration: 'none' }}><AppName image={storageIcon} appname='Storage' /></Link>
				<Link to='/notepad' style={{ textDecoration: 'none' }}><AppName image={notepadIcon} appname='Notepad' /></Link>
				<Link to='/todo' style={{ textDecoration: 'none' }}><AppName image={todoIcon} appname='Todo' /></Link>
				<Link to='/expense' style={{ textDecoration: 'none' }}><AppName image={expenseIcon} appname='Expenses' /></Link>
				<Link to='/simon-game' style={{ textDecoration: 'none' }}><AppName image={simonIcon} appname='Simon' /></Link>
				<Link to='/link-short' style={{ textDecoration: 'none' }}><AppName image={linkIcon} appname='Short-URL' /></Link>
				<Link to='/lunar' style={{ textDecoration: 'none' }}><AppName image={lunarIcon} appname='Calendar' /></Link>
				<Link to='/chat' style={{ textDecoration: 'none' }}><AppName image={chatIcon} appname='Chat' /></Link>
				<Link to='/photo' style={{ textDecoration: 'none' }}><AppName image={photoIcon} appname='Photu' /></Link>
			</div>
		</div>
	)
}
