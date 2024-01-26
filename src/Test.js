import React, { useState } from 'react'

export default function Test() {
    const folders = ['fol1', 'fol2', 'fol3', 'fol4', 'fol5']
    const [paths, setPaths] = useState(['root']);

    function folderClickHan(folder) {
        setPaths((prev) => [...prev, folder]);
    }
    function pathClickHan(index) {
        setPaths((prev) => prev.filter((_, i) => i <= index));
    }

    return (
        <div style={{ color: 'wheat', backgroundColor: 'wheat' }}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {paths.map((path, index) => {
                        if ((index + 1) === paths.length) {
                            return <li className="breadcrumb-item active" aria-current="page">{path}</li>

                        }
                        return <li className="breadcrumb-item"><a href="#" onClick={() => pathClickHan(index)}>{path}</a></li>
                    })}
                </ol>
            </nav>
            {folders.map((item) => <button onClick={() => folderClickHan(item)}>{item}</button>)}
        </div>
    )
}
