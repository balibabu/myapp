import React, { useEffect, useState } from 'react'
import CustomModal from '../../../utility/CustomModal';
import FloatButton from '../../../utility/FloatButton';

export default function CreateTodo({ onCreate, selectedTab, setSelectedTab, tabs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    useEffect(() => {
        setCategory(tabs[selectedTab])
    }, [selectedTab, tabs])


    function saveHandler() {
        onCreate({ title, category })
        setSelectedTab(0);
        setTitle('');
        setIsModalOpen(false);
    }


    return (
        <div>
            <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} top='20'>
                <div className=''>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" placeholder="type your goal here" />
                    <div className="input-group mt-2">
                        <label className="input-group-text" htmlFor="category">Category</label>
                        <input type="text" className="form-control" id='category' onChange={(e) => setCategory(e.target.value)} value={category} />
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {tabs.map((item, index) => <li key={index}><button className="dropdown-item" onClick={() => setCategory(item)}>{item}</button></li>)}
                        </ul>
                    </div>
                    <div className="input-group mt-2">
                        <button type="button" className="btn btn-primary form-control" onClick={()=>setIsModalOpen(false)}>Close</button>
                        <button type="button" className="btn btn-success form-control" onClick={saveHandler}>Save changes</button>
                    </div>
                </div>
            </CustomModal>
            <FloatButton onPress={() => setIsModalOpen(true)} />
        </div>
    )
}


{/* <div className="modal fade" id={modalId} tabIndex="-1">
<div className="modal-dialog modal-dialog-top">
    <div className="modal-content">
        <div className="modal-header py-1">
            <div className="modal-title fs-5">Give a Title</div>
        </div>
        <div className="modal-body p-2">
            <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" placeholder="type your goal here" />
            <div className="input-group mt-2">
                <label className="input-group-text" htmlFor="category">Category</label>
                <input type="text" className="form-control" id='category' onChange={(e) => setCategory(e.target.value)} value={category} />
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {tabs.map((item, index) => <li key={index}><button className="dropdown-item" onClick={() => setCategory(item)}>{item}</button></li>)}
                </ul>
            </div>
        </div>
        <div className="modal-footer p-0">
            <button type="button" className="btn btn-secondary btn-sm me-3" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary btn-sm me-2" data-bs-dismiss="modal" onClick={saveHandler}>Save changes</button>
        </div>
    </div>
</div>
</div> */}