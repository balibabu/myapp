import React from 'react'
import './style.css';
import UseOfIframe from './UseOfIframe';
import IntelligentSize from '../components/Apps/Storage/extra/IntelligentSize';


export default function ResearchAndDevelopment() {
    return (
        <div>
            {/* <UseOfIframe /> */}
            <input type="file" onChange={(e)=>{
                const file=e.target.files[0]
                console.log(file.size);
                console.log(IntelligentSize(file.size));
            }}/>
            [125 bytes]
        </div>
    )
}
