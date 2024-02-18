import React from 'react'
import { useNavigate } from 'react-router-dom';
import UploadIcon from '../../../../images/UploadIcon';

export default function Uploadbar() {
    const navigate = useNavigate();
    const isWindows = navigator.platform.toLowerCase().includes('win');
    return (
        <div className='p-0 rounded overflow-hidden'>
            {isWindows ?
                <>
                    <div className='bg-secondary d-flex justify-content-between p-1'>
                        <div style={{ width: '1.5rem', cursor: 'pointer' }} onClick={() => navigate('/photo/upload/')}><UploadIcon /></div>
                        <div><input type="text" className='form-control p-0 m-0 ps-2 bg-secondary border border-black border-1' placeholder='search'/></div>
                    </div>
                </> :
                <div>
                    <div style={{ right: '10px', bottom: '10px', position: 'fixed'}}>
                        <button className='btn btn-primary' style={{width:'50px'}} onClick={() => navigate('/photo/upload/')}><UploadIcon /></button>
                    </div>
                </div>
            }
        </div>
    )
}
