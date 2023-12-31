import React, { useContext, useEffect, useState } from 'react'
import SearchBox from './SearchBox'
// import FloatButton from '../../../utility/FloatButton'
import ConversationsRender from './ConversationsRender';
import VariableContext from '../../../global/VariableContext';
import incommingSound from './sound/incomming1.mp3';

export default function ConversationListArea({ onSelect }) {
    const [, setInitialFetch] = useState(false);
    const { conversations, fetchConversations } = useContext(VariableContext);

    useEffect(() => {
        // var count = 1;
        let timeoutId;

        // function doSomething() {
        //     fetchConversations(incommingSound)
        //     console.log(count);
        //     count++;


        // }
        function logCountWithForLoop() {
            for (let count = 0; count < 5; count++) {
                // Use an IIFE (Immediately Invoked Function Expression) to create a closure
                (function (currentCount) {
                    timeoutId=setTimeout(function () {
                        console.log(currentCount);
                        fetchConversations(incommingSound)
                    }, 2000 * (1+currentCount) * (1+currentCount));
                })(count);
            }
        }


        setInitialFetch((prev) => {
            if (!prev) {
                logCountWithForLoop();
                fetchConversations();
            }
            return true;
        })
        return ()=>clearTimeout(timeoutId);
        // eslint-disable-next-line
    }, [])

    return (
        <div className='position-relative' style={{ height: "88dvh", overflow: "auto" }}>
            <ConversationsRender conversations={conversations} onSelect={onSelect} />
            <SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
            <button
                type="button"
                className="btn btn-success btn-lg position-absolute bottom-0 end-0"
                data-bs-toggle="modal" data-bs-target="#searchUserModal"
            >+</button>
        </div>
    )
}
