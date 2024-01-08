import React, { useContext, useEffect, useState } from 'react'
import FileItem from './FileItem';
import VariableContext from '../../../global/VariableContext';
import LoadingUI from '../../../utility/LoadingUI';

export default function FileRender(props) {

    return (
        <div className='row m-0 pt-2'>
            {props.files.map((file) => {
                return (
                    <FileItem key={file.id} file={file} />
                );
            })}
        </div >
    )
}
