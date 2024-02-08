import React, { useContext } from 'react'
import VariableContext from '../components/Contexts/VariableContext';

export default function ToastDialog() {
    const { toast } = useContext(VariableContext);
    return (
        <>
            {toast &&
                <div
                    className={
                        `
                        bg-${toast.type}
                        rounded
                        text-center fs-4
                        position-absolute top-50 start-50 translate-middle
                        p-2
                        `
                    }
                >
                    <p>{toast.msg}</p>
                </div>}
        </>
    )
}


// usage example
// import show text from variables
// insert Tag -> <ToastDialog/> in your componenet
// set -> showToast('changed into multiline text','info');