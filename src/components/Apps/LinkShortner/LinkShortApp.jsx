import React, { useState } from 'react'
import { AddLink } from '../../../http/ShortenLink';
import { copyToClipboard } from '../../../utility/utilities';

export default function LinkShortApp() {
    const [copy, setCopy] = useState('copy');
    const [link, setLink] = useState('');
    const [shortlink, setShortlink] = useState('');

    const onShrink = async () => {
        if(shortlink){
            return;
        }
        if (link.trim().length > 0 && isValidURL(link)) {
            setShortlink('wait...generating...')
            const linkid = await AddLink(link);
            setShortlink(`balibabu.github.io/myapp#/a/${linkid}`);
        }else{
            setShortlink('please paste valid url')
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
        setTimeout(() => {
            setCopy('copy');
        }, 1000);
    }
    return (
        <div>
            <div className='m-0'>
                <h1 className='bg-primary m-0 p-2'>Shorten Your Link</h1>
                <p className='px-3 py-2' style={{ color: "white" }}>Say goodbye to long, cumbersome URLs and hello to concise and shareable links! This Link Shortener empowers you to effortlessly shorten URLs, making them perfect for social media, messaging, and more.</p>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-12 col-md-8'>
                    <div className='row m-0'>
                        <div className='input-group mb-3'>
                            <input type="text"
                                className='form-control'
                                value={link}
                                onChange={onLinkChange}
                                placeholder='paste your link here'
                            />
                            <button
                                className='btn btn-primary'
                                onClick={onShrink}
                            >shrink</button>
                        </div>
                        <div>
                            <pre style={{ backgroundColor: "black" }} className='rounded text-primary d-flex justify-content-between align-items-center ps-2'>
                                <code>
                                    {shortlink}
                                </code>
                                <button className='btn btn-info' onClick={onCopy}>{copy}</button>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



function isValidURL(url) {
    // Regular expression for a URL with an optional protocol (http/https)
    var urlRegex = /^(https?|ftp):\/\/([^\s]+)$/;

    // Test the URL against the regular expression
    return urlRegex.test(url);
}
