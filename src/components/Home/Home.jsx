import React from 'react'
import notepadIcon from '../../images/AppIcon/notepad.png'
import todoIcon from '../../images/AppIcon/todo.png'
import chatIcon from '../../images/AppIcon/chat.png'
import simonIcon from '../../images/AppIcon/simon.png'
import expenseIcon from '../../images/AppIcon/expense.png'
import linkIcon from '../../images/AppIcon/link2.png'
import lunarIcon from '../../images/AppIcon/lunar.png'
import storageIcon from '../../images/AppIcon/storage.png'
import photoIcon from '../../images/AppIcon/photoIcon.png'
import shareitIcon from '../../images/AppIcon/shareit.png'
import blogIcon from '../../images/AppIcon/blog.png'
import Navbar from './Navbar'
import AppIcon from './AppIcon'

export default function Home() {
	return (
		<div style={{ backgroundColor: "rgb(54, 54, 54)", height: "100dvh" }}>
			<Navbar />
			<div className='row m-0 pt-2 px-1'>
				<AppIcon image={shareitIcon} appname='Share' openApp='/share' />
				<AppIcon image={lunarIcon} appname='Calendar' openApp='/lunar' />
				<AppIcon image={linkIcon} appname='Shrink-URL' openApp='/link-short' />
				<AppIcon image={simonIcon} appname='Simon' openApp='/simon-game' />
				<AppIcon image={chatIcon} appname='Chat' openApp='/chat' />
				<AppIcon image={storageIcon} appname='Storage' openApp='/storage/null' />
				<AppIcon image={notepadIcon} appname='Notepad' openApp='/notepad' />
				<AppIcon image={todoIcon} appname='Todo' openApp='/todo' />
				<AppIcon image={expenseIcon} appname='Expenses' openApp='/expense' />
				<AppIcon image={photoIcon} appname='Photu' openApp='/photo' />
				<AppIcon image={blogIcon} appname='Blog' openApp='/blogs' />
			</div>
		</div>
	)
}
