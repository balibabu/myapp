import React, { useContext } from 'react'
import FileItem from './FileItem';
import VariableContext from '../../../global/VariableContext';
import LoadingUI from '../../../utility/LoadingUI';

export default function FileRender(props) {
    const { loadingFileItem } = useContext(VariableContext);
    return (
        <div className='row m-0 pt-2'>
            {
                loadingFileItem === 'newfile' &&
                <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' style={{ position: "relative", opacity: "50%" }}>
                    <LoadingUI width="40px" />
                    <span className='fs-4'>New File</span>
                </div>
            }

            {props.files.map((file) => {
                return (
                    <FileItem key={file.id} file={file} />
                );
            })}
        </div >
    )
}
