import { getLatestMessages } from "../../../http/chat";
import receiveSound from '../Chat/sound/incomming2.mp3';

export async function addMessages(token,setMessages,activeUser,lastMsgIdRef) {
    if(lastMsgIdRef.current===null){
        return;
    }

    try {
        const newMsgs = await getLatestMessages(token, lastMsgIdRef.current, activeUser.id);
        if(newMsgs.length>0){
            playSound();
            setMessages((prev)=>{
                return {...prev,[activeUser.id]:[...prev[activeUser.id],...newMsgs]}
            })
            lastMsgIdRef.current=newMsgs[newMsgs.length-1].id;
        }
    } catch (error) {
        console.error("Error fetching new messages:", error);
    }
}



function playSound() {
	var audio = new Audio(receiveSound);
	audio.play();
}