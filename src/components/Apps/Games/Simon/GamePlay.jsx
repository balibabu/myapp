import React, { useEffect, useState } from 'react'
import './SimonGame.css'
import green from './sounds/green.mp3'
import red from './sounds/red.mp3'
import blue from './sounds/blue.mp3'
import yellow from './sounds/yellow.mp3'
import gameOverMusic from './sounds/wrong.mp3'

var counter = 0;
var gamePattern = [];

export default function GamePlay(props) {
    const patterDict = { 0: 'yellow', 1: 'red', 2: 'blue', 3: 'green' }
    const [pressedState, setPressedState] = useState({ 'red': '', 'blue': '', 'green': '', 'yellow': '' });
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (gamePattern.length === 0) {
            playNextColor()
        }
    }, [])



    const btn_clicked = (event) => {
        var correctColor = patterDict[gamePattern[gamePattern.length - counter]]
        if (correctColor === event.target.id) {
            counter -= 1;
            playSound(correctColor);
            buttonAnimation(correctColor, setPressedState);
            setScore(prevScore => prevScore + 1)
        } else {
            playSound('wrong');
            gamePattern = []
            alert(score);
            setScore(0);
            props.setGameState(false);
        }
        if (counter === 0) {
            playNextColor();
        }
    }

    const playNextColor = () => {
        var randomNum = nextSequence()
        gamePattern.push(randomNum)
        counter = gamePattern.length
        setTimeout(() => {
            playSound(patterDict[randomNum])
            buttonAnimation(patterDict[randomNum], setPressedState)
        }, 1000);
    }

    return (
        <>
            <div className='d-flex justify-content-around'>
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
