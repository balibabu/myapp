import React, { useState } from 'react'
import { downloadHandler } from '../../../../http/FileShare';

export default function Download({ setWork, setFileShareReceiveProgress }) {
    const [key, setKey] = useState();

    function proceedHandler() {
        if (key) {
            downloadHandler(key, setFileShareReceiveProgress);
        }
        setWork((prev) => [prev[0], false])
    }
    return (
        <div className='mt-4'>
            <div className="d-flex justify-content-center">
                <div className='col-lg-2 col-6 d-flex'>
                    <div className='input-group'>
                        <input type="number" className="form-control" placeholder="file key" value={key} onChange={(e) => setKey(e.target.value)} />
                        <button className="btn btn-primary" onClick={proceedHandler}>{key ? 'Proceed' : 'cancel'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
