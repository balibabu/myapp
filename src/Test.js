import React, { useState } from 'react'
import BreadCrumbs from './Test/BreadCrumbs'
import CustomModal from './utility/CustomModal';
import DragDrop from './components/Apps/Storage/DragDrop';

export default function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <BreadCrumbs />
            <button onClick={() => setIsModalOpen(true)}>hi</button>
            <CustomModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                top='20'
            >
                <DragDrop />
            </CustomModal>

        </div>
    )
}
