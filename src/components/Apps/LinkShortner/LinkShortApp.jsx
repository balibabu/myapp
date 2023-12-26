import React, { useState } from 'react'
import { AddLink } from '../../../http/ShortenLink';
import { copyToClipboard } from '../../../utility/utilities';

export default function LinkShortApp() {
    const [copy, setCopy] = useState('copy');
    const [link, setLink] = useState('');
    const [shortlink, setShortlink] = useState('');

    const onShrink = async () => {
        if (!shortlink) {
            setShortlink('wait...generating...')
            const linkid = await AddLink(link);
            setShortlink(`balibabu.github.io/myapp#/a/${linkid}`);
        }
    }

    const onLinkChange = (e) => {
        setLink(e.target.value);
        setShortlink('');
        setCopy('copy');
    }

    const onCopy = () => {
        copyToClipboard(shortlink);
        setCopy('copied');
    }
    return (
        <div>
            <div className='m-0' style={{backgroundColor: "#403d39",height:"20vh"}}>
                <h1 className='bg-primary m-0 p-0'>Shorten Your Link</h1>
                <p className='p-2 m-0' style={{color: "white"}}>Say goodbye to long, cumbersome URLs and hello to concise and shareable links! This Link Shortener empowers you to effortlessly shorten URLs, making them perfect for social media, messaging, and more.</p>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#403d39", height: "80vh", color: "wheat", paddingBottom: "60vh" }}>
                <div className='col-12 col-md-8'>
                    <div className='row m-0'>
                        <div className='input-group'>
                            <input type="text"
                                className='form-control mb-2'
                                value={link}
                                onChange={onLinkChange}
                            />
                            <button
                                className='btn btn-primary mb-2'
                                onClick={onShrink}
                            >shrink</button>
                        </div>
                        <div>
                            <pre style={{ backgroundColor: "black" }} className='rounded ps-2 text-primary d-flex justify-content-between'>
                                <code>
                                    {shortlink}
                                </code>
                                <button className='btn btn-info px-1 p-0' onClick={onCopy}>{copy}</button>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
