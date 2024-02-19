import React, { useContext, useState } from 'react'
import ProgressButton from '../../../Shared/ProgressButton'
import Send from './Send';
import Download from './Download';
import VariableContext from '../../../Contexts/VariableContext';
import History from './History';

export default function Fileshare() {
    const [work, setWork] = useState([false, false]);
    const { fileShareSendProgress, setFileShareSendProgress, fileShareReceiveProgress, setFileShareReceiveProgress } = useContext(VariableContext);
    const [history, setHistory] = useState(localStorage.getItem('shared'));

    return (
        <>
            {work[0] && <Send {...{ setWork, setFileShareSendProgress, setHistory }} />}
            {work[1] && <Download {...{ setWork, setFileShareReceiveProgress }} />}
            <div>
                <div className='col-lg-5 col-md-6 col-10 position-absolute start-50 top-50 translate-middle'>
                    <ProgressButton {...{ progress: fileShareSendProgress, titles: ['Send', 'Sending', 'Processing'], css: 'mb-3', height: '150px', bg: 'primary', clickHandler: () => setWork([true, work[1]]) }} />
                    <ProgressButton {...{ progress: fileShareReceiveProgress, titles: ['Receive', 'Receiving', 'Processing'], height: '150px', clickHandler: () => setWork([work[0], true]) }} />
                </div>
            </div>
            {history && <History {...{ history, setHistory }} />}
        </>
    )
}
