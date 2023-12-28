import { getLatestMessages } from "../../../http/chat";

export async function addMessages(token,setMessages,activeUser,lastMsgIdRef) {
    if(lastMsgIdRef.current===null){
        setMessages((prev)=>{
            const msgs=prev[activeUser.id];
            lastMsgIdRef.current=msgs[msgs.length-1].id
            return prev;
        })
    }

    try {
        const newMsgs = await getLatestMessages(token, lastMsgIdRef.current, activeUser.id);
        if(newMsgs.length>0){
            setMessages((prev)=>{
                return {...prev,[activeUser.id]:[...prev[activeUser.id],...newMsgs]}
            })
            lastMsgIdRef.current=newMsgs[newMsgs.length-1].id;
        }
    } catch (error) {
        console.error("Error fetching new messages:", error);
    }
}
