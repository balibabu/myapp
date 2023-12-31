import React, { useContext, useState } from 'react'
import AuthContext from '../../global/AuthContext'
import profileImg from '../../images/contactProfile.jpg'
import { UploadProfile } from '../../http/User';

export default function Dropdown() {
    const { logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(profileImg);
    return (
        <div className="dropdown ms-2">
            <img className='dropdown-toggle rounded-5' data-bs-toggle="dropdown" aria-expanded="false"
                style={{ width: "50px", height: "50px" }} src={profile} alt="" />

            <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item"
                    data-bs-toggle="modal" data-bs-target="#profileUrl"
                >Upload Pic</button></li>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
            </ul>
            <Modal setProfile={setProfile} />
        </div>
    )
}


function Modal({ setProfile }) {
    const [url, setUrl] = useState('');

    return (
        <div className="modal fade" id="profileUrl" tabIndex="-1" aria-labelledby="profileUrlModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className='input-group'>
                            <input onChange={(e) => setUrl(e.target.value)} value={url} className="form-control form-control-lg" type="text" placeholder="provide url" />
                            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    UploadProfile(url);
                                    setProfile(url);
                                    setUrl('');
                                }}
                            >U</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
