import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Breadcrumbs.css'

export default function BreadCrumbs({ selected, folders }) {
    const [paths, setPaths] = useState([{ title: 'Root', id: -1 }]);
    const navigate = useNavigate();

    useEffect(() => {
        if (folders) {
            let folder = folders.find(item => item.id === parseInt(selected));
            folder = folder ? folder : { title: 'Root', id: -1 }
            const index = paths.findIndex(item => item.id === parseInt(selected));
            if (!isNaN(selected) && index === -1) {
                setPaths((prev) => [...prev, folder]);
            } else {
                if (index === -1) {
                    setPaths((prev) => prev.filter((_, i) => i <= 0));

                } else {
                    setPaths((prev) => prev.filter((_, i) => i <= index));
                }
            }
        }
// eslint-disable-next-line
    }, [folders, selected])

    function pathClickHan(id) {
        const index = paths.findIndex(item => item.id === id);
        navigate(-(paths.length - index - 1));
    }

    return (
        <nav className="breadcrumbs m-2">
            {paths.length>1 && paths.map((path, index) => {
                if ((index + 1) === paths.length) {
                    return <span key={index} className='breadcrumbs__item is-active'>{path.title}</span>
                }
                return <span key={index} className='breadcrumbs__item' onClick={() => pathClickHan(path.id)}>{path.title}</span>
            })}
        </nav>
    )
}
