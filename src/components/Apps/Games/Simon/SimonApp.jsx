import React, { useState } from 'react'
import GamePlay from './GamePlay'

export default function SimonApp() {
	const [gameState, setGameState] = useState(false);

	return (
		<div style={{ backgroundColor: "#2f3e46", height: "100vh" }}>
			{
				gameState ?
					<GamePlay setGameState={setGameState} />
					:
					<>
						<div>Game Logs</div>
						<button
							style={floatingButtonStyle}
							onClick={() => setGameState(true)}
							className='btn btn-success btn-lg'
						>Play</button>
					</>
			}
		</div>
	)
}


const floatingButtonStyle = {
	position: 'fixed',
	top: '90%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	fontWeight: "bolder",
	borderRadius: "10px",
};
