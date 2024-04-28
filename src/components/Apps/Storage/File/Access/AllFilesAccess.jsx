import React from 'react'
import { RemoveIcon } from '../../../../../images/RemoveIcon';

export default function AllFilesAccess() {
    return (
        <div style={{ color: '#ccc' }} className='col-xl-8 col-lg-9 col-md-10 col-12'>
            <h1>All Shared Files</h1>
            <h3>Shared By You</h3>
            <SharedItem />
            <SharedItem />
            <h3>Shared To You</h3>
            <SharedItem />
            <SharedItem />
        </div>
    )
}

function SharedItem(props){
    return (
        <div className='d-flex justify-content-between'>
            <div>file.extension</div>
            <div>file.size</div>
            <div>sharedWith/anyone</div>
            <div style={{width:'20px'}}><RemoveIcon/></div>
        </div>
    );
}