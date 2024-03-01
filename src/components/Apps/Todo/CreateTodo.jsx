import React, { useEffect, useRef, useState } from 'react'
import CustomModal from '../../../utility/CustomModal';
import FloatButton from '../../../utility/FloatButton';

export default function CreateTodo({ onCreate, selectedTab, setSelectedTab, tabs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const inputFieldRef = useRef();

    useEffect(() => {
        setCategory(tabs[selectedTab]);
    }, [selectedTab, tabs])


    function saveHandler() {
        onCreate({ title, category })
        setSelectedTab(0);
        setTitle('');
        setIsModalOpen(false);
    }

    function clickHandler() {
        setIsModalOpen(true);
        setTimeout(() => {
            inputFieldRef.current.focus();
        }, 200);
    }


    return (
        <div>
            <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} top='20'>
                <div className=''>
                    <div className="input-group mb-2">
                        <label className="input-group-text" htmlFor="category">Category</label>
                        <input type="text" className="form-control" id='category' onChange={(e) => setCategory(e.target.value)} value={category} />
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {tabs.map((item, index) => <li key={index}><button className="dropdown-item" onClick={() => setCategory(item)}>{item}</button></li>)}
                        </ul>
                    </div>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" placeholder="type your goal here" ref={inputFieldRef} />
                    <div className="input-group mt-2">
                        <button type="button" className="btn btn-primary form-control" onClick={() => setIsModalOpen(false)}>Close</button>
                        <button type="button" className="btn btn-success form-control" onClick={saveHandler}>Save changes</button>
                    </div>
                </div>
            </CustomModal>
            <FloatButton onPress={clickHandler} />
        </div>
    )
}