import React, { useEffect, useState } from 'react'
import TodoRender from './TodoRender';

export default function Category(props) {
    const [tabStyle, setTabStyle] = useState({});
    useEffect(() => {
        setTabStyle({
            [props.selectedTab - 1]: {
                borderRadius: '0 0 1.8rem 0',
                width: ''
            },
            [props.selectedTab]: {
                borderRadius: '1.2rem 1.2rem 0 0',
                backgroundColor: 'rgb(109, 184, 255)',
                color: 'black',
                width: '',
                // fontSize:'18px'
            },
            [props.selectedTab + 1]: {
                borderRadius: '0 0 0 1.8rem',
                width: ''
            }
        })
    }, [props.selectedTab])

    return (
        <>
            <div style={tabContainerStyle}>
                <div className='d-flex overflow-x-scroll custom-scrollbar' style={{ backgroundColor: 'rgb(75,77,90)' }}>
                    {props.tabs.map((tab, index) =>
                        <div style={index !== props.selectedTab ? {backgroundColor: 'rgb(109, 184, 255)'} : {}} key={index}>
                            <div
                                style={{ ...defaulTabStyle, ...tabStyle[index] }}
                                onClick={() => props.setSelectedTab(index)}
                            >{tab}</div>
                        </div>
                    )}
                </div>
            </div>
            <TodoRender
                todoList={props.todoList.filter((item) => item.category === props.tabs[props.selectedTab])}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate} />
        </>
    )
}

const tabContainerStyle = {
    fontSize: '20px',
    cursor: 'pointer',
}
const defaulTabStyle = {
    color: 'wheat',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: 'rgb(75,77,90)',
    padding: '.5rem',
    paddingRight: '1.2rem',
    paddingLeft: '1.2rem',
    whiteSpace: 'nowrap'
}
