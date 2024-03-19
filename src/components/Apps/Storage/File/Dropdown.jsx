import React from 'react'
import ThreeDots from '../../../../images/ThreeDots'

export default function Dropdown({ deleteHandler, downLoadhandler, cutHandler, save, isRenaming, setIsRenaming, navigate, file }) {
    return (
        <div className="dropdown" style={{ cursor: 'pointer' }}>
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                {isRenaming ?
                    <>
                        <span className="dropdown-item " onClick={save}>Save</span>
                        <span className="dropdown-item " onClick={() => setIsRenaming(false)}>Cancel</span>
                    </>
                    :
                    <>
                        <span className="dropdown-item " onClick={() => setIsRenaming(true)}>Rename</span>
                        <span className="dropdown-item " onClick={cutHandler}>Cut</span>
                        <span className="dropdown-item " onClick={downLoadhandler}>Download</span>
                        <span className="dropdown-item " onClick={deleteHandler}>Delete</span>
                        <span className="dropdown-item " onClick={() => navigate(`/storage/share/${file.id}`)}>Share</span>
                    </>}
            </ul>
        </div>
    )
}
