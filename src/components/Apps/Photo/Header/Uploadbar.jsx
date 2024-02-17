import React from 'react'

export default function Uploadbar({ handleInputChange, uploadhandler }) {
    const isWindows = navigator.platform.toLowerCase().includes('win');
    return (
        <>
            {isWindows ?
                <>
                    <div className="col">
                        <div className='input-group mt-2'>
                            <input className='form-control' type="file" multiple onChange={handleInputChange} />
                            <button className="btn btn-info z-1" onClick={uploadhandler}>upload</button>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='input-group mt-2'>
                            <input className='form-control' type="text" multiple onChange={handleInputChange} />
                            <button className="btn btn-primary z-1">search</button>
                        </div>
                    </div>
                </> :
                <>
                    <div className='position-fixed bottom-0'>
                        <div className='input-group'>
                            <input className='form-control' type="file" multiple onChange={handleInputChange} />
                            <button className="btn btn-info z-1" onClick={uploadhandler}>upload</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
