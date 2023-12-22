import React, { useState } from 'react'
import { AddLink } from '../../../http/ShortenLink';
import { copyToClipboard } from '../../../utility/utilities';

export default function LinkShortApp() {
    const [copy, setCopy] = useState('copy');
    const [link, setLink] = useState('');
    const [shortlink, setShortlink] = useState('');

    const onShrink=async ()=>{
        if(!shortlink){
            setShortlink('wait...generating...')
            const linkid=await AddLink(link);
            setShortlink(`balibabu.github.io/myapp#/a/${linkid}`);
        }
    }

    const onLinkChange=(e)=>{
        setLink(e.target.value);
        setShortlink('');
        setCopy('copy');
    }

    const onCopy = () => {
        copyToClipboard(shortlink);
        setCopy('copied');
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#403d39", height: "100vh", color: "wheat", paddingBottom:"60vh" }}>
            <div className='col-12 col-md-8'>
                <div className='row m-0'>
                    <div className='px-5 input-group'>
                        <input type="text"
                            className='col-12 col-sm-10 form-control mb-2'
                            value={link}
                            onChange={onLinkChange}
                        />
                        <button
                            className='col-12 col-sm-2 btn btn-primary mb-2'
                            onClick={onShrink}
                        >shrink</button>
                    </div>
                    <div className='px-5'>
                        <pre style={{ backgroundColor: "black" }} className='rounded ps-2 text-primary  d-flex justify-content-between'>
                            <code>
                                {shortlink}
                            </code>
                            <button className='btn btn-info px-1 p-0' onClick={onCopy}>{copy}</button>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
