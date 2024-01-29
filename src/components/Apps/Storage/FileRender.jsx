import React from 'react'
import FileItem from './FileItem';

export default function FileRender(props) {

    return (
        <div className='row m-0 pt-2'>
            {props.files && props.files.map((file) => {
                return (
                    <FileItem key={file.id} file={file} />
                );
            })}
        </div >
    )
}
