import React from 'react'

export default function SimonLogs() {
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        // return `${hours} hour : ${String(minutes).padStart(2, '0')} minutes : ${String(remainingSeconds).padStart(2, '0')} seconds`;
    };
    return (
        <div className='p-5'>
            <h4 className='text-white'>Total Played Time: {formatTime(getTotalPlayedTime())}</h4>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">Finish Time</th>
                        <th scope="col">Score</th>
                        <th scope="col">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {gameLogs.map(log => (<tr key={log.id}>
                        <td>{formatDateTime(log.startedAt)}</td>
                        <td>{formatDateTime(log.finishedAt)}</td>
                        <td>{log.score}</td>
                        <td>{timeDifferenceInSeconds(log.startedAt, log.finishedAt)}s</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}
