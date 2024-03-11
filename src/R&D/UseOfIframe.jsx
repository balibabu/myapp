import React from 'react'
import Profile from '../images/contactProfile.jpg';

export default function UseOfIframe() {
    return (
        <div>
            <iframe src={Profile} title="Prfile image"></iframe>
        </div>
    )
}
