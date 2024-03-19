import React, { useState } from 'react'
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import IntelligentSize from '../extra/IntelligentSize';
import DownloadIcon from '../../../../images/storage/DownloadIcon';
import Progress from '../../../Shared/Progress';

export default function SharedFile({ file, ActionFunction, token, notify, setSharedByMe }) {
    const [progress, setProgress] = useState(0);

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 px-1'>
            <div className='mt-2 p-2 rounded-3 bg-secondary'>
                <div className='d-flex justify-content-between'>
                    <div className='col-11 ps-2'>
                        <div className='m-0' style={{ overflow: "hidden", whiteSpace: "nowrap", cursor: 'pointer' }}>{file.title}</div>
                        {progress > 0 && <Progress progress={progress} />}
                        <div className='d-flex justify-content-between'>
                            <div className='text-white' style={{ fontSize: "14px" }}>{IntelligentSize(file.size)}</div>
                            <small className='text-white pe-3' style={{ fontSize: "10px" }}>{convertUtcToLocal(file.timestamp).toString()}</small>
                        </div>
                    </div>
                    {progress === 0 && <ActionFunction {...{ token, file, setProgress, notify, setSharedByMe }} />}
                </div>
            </div>
        </div>
    )
}
