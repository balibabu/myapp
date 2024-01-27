import React, { useState } from 'react'
import BreadCrumbs from './Test/BreadCrumbs'
import CustomModal from './utility/CustomModal';

export default function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>hi</button>
            <CustomModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                 top='20'
            >
                <BreadCrumbs />
            </CustomModal>
        </div>
    )
}
