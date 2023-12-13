import React from 'react'

var counter = 0;
var gamePattern = [];
var startTime;
var endTime;

export default function GamePlay() {
    const patterDict = { 0: 'yellow', 1: 'red', 2: 'blue', 3: 'green' }
    const [pressedState, setPressedState] = useState({ 'red': '', 'blue': '', 'green': '', 'yellow': '' });

    const btn_clicked = (event) => {
        var correctColor = patterDict[gamePattern[gamePattern.length - counter]]
        if (correctColor === event.target.id) {
            counter -= 1;
            playSound(correctColor);
            buttonAnimation(correctColor, setPressedState);
            setScore(prevScore => prevScore + 1)
        } else {
            game_over(score, url, authTokens, setGameLogs, setGameState, setScore)
        }
        if (counter === 0) {
            setTimeout(() => {
                playNextColor();
            }, 1000);
        }
    }

    const playNextColor = () => {
        var randomNum = nextSequence()
        gamePattern.push(randomNum)
        counter = gamePattern.length
        playSound(patterDict[randomNum])
        buttonAnimation(patterDict[randomNum], setPressedState)
    }

    const onStart = () => {
        startTime = new Date();
        setGameState(true);
        setTimeout(() => {
            playNextColor()
        }, 1000);
    }
    const getTotalPlayedTime = () => {
        let totalPlayedTimeInSeconds = 0;
        gameLogs.forEach(log => {
            totalPlayedTimeInSeconds += timeDifferenceInSeconds(log.startedAt, log.finishedAt);
        });
        return Math.floor(totalPlayedTimeInSeconds);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        // return `${hours} hour : ${String(minutes).padStart(2, '0')} minutes : ${String(remainingSeconds).padStart(2, '0')} seconds`;
    };

    return (
 <>
                    <div className='d-flex justify-content-around mt-5'>
                        <h1>Score - {score}</h1>
                    </div>
                    <div className='d-flex justify-content-around mt-5'>
                        <div>
                            <div className="input-group">
                                <div id='green' className={"_btn green " + pressedState['green']} onClick={btn_clicked}></div>
                                <div id='red' className={"_btn red " + pressedState['red']} onClick={btn_clicked}></div>
                            </div>
                            <div className="input-group">
                                <div id='blue' className={"_btn blue " + pressedState['blue']} onClick={btn_clicked}></div>
                                <div id='yellow' className={"_btn yellow " + pressedState['yellow']} onClick={btn_clicked}></div>
                            </div>
                        </div>
                    </div>
                    <button onClick={quit} className='btn btn-danger px-4 ' style={quitButtonStyle}>Quit</button>
                </>
    )
}



function playSound(colorName) {
    var sounds = { 'green': green, 'red': red, 'blue': blue, 'yellow': yellow, 'wrong': gameOverMusic }
    var audio = new Audio(sounds[colorName]);
    audio.play();
}

function buttonAnimation(colorName, setPressedState) {
    setPressedState(prevState => ({
        ...prevState,
        [colorName]: 'pressed'
    }));
    setTimeout(() => {
        setPressedState({ 'red': '', 'blue': '', 'green': '', 'yellow': '' });
    }, 200);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function game_over(score, url, authTokens, setGameLogs, setGameState, setScore) {
    endTime = new Date();
    var data = {
        'gameTitle': 'simon',
        'startedAt': startTime,
        'finishedAt': endTime,
        'score': score
    }
    logGame(url, authTokens.access, data, setGameLogs)

    playSound('wrong')
    const element = document.getElementById("root");
    element.classList.add("game-over");
    setTimeout(() => {
        element.classList.remove("game-over");
        setGameState(false)
        setScore(0)
        gamePattern = []
    }, 1000);
}

function formatDateTime(datetime) {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function timeDifferenceInSeconds(isoStartedAt, isoFinishedAt) {
    const startedAt = new Date(isoStartedAt);
    const finishedAt = new Date(isoFinishedAt);
    return Math.floor((finishedAt - startedAt) / 1000);
}


const floatButtonContainerStyle = {
    position: 'fixed',
    bottom: '50px', // Adjust this value to set the desired distance from the bottom
    right: '45%', // Adjust this value to set the desired distance from the right
    zIndex: 1000, // Set a z-index value to control the stacking order
};

const floatButtonStyle = {
    borderRadius: '100px',
    width: '5rem',
    padding: '20%',
};

const quitButtonStyle = {
    borderRadius: '20px',
    position: 'fixed',
    bottom: '50px', // Adjust this value to set the desired distance from the bottom
    right: '45%', // Adjust this value to set the desired distance from the right
    zIndex: 1000,
};
