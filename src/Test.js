import React, { useEffect, useState } from 'react'
import Test1 from './Test/Test1';

const tabList = []
for (let i = 1; i < 25; i++) {
    tabList.push(`school ${i}`)
}

export default function Test() {
    const [tabs, setTabs] = useState(tabList);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabStyle, setTabStyle] = useState({});
    useEffect(() => {
        setTabStyle({
            [selectedTab - 1]: {
                borderRadius: '0 0 .8rem 0',
                width:''
            },
            [selectedTab]: {
                borderRadius: '1rem 1rem 0 0',
                backgroundColor: '#6c757d',
                color: 'white',
                width:''
            },
            [selectedTab + 1]: {
                borderRadius: '0 0 0 .8rem',
                width:''
            }
        })
    }, [selectedTab])

    return (
        <>
            <div style={tabContainerStyle}>
                <div className='d-flex overflow-x-scroll' style={{ backgroundColor: 'rgb(75,77,90)' }}>
                    {tabs.map((tab, index) =>
                        <div className={index !== selectedTab ? 'bg-secondary' : ''}>
                            <div
                                style={{ overflow: 'hidden',textOverflow: 'ellipsis',width:'70px',backgroundColor: 'rgb(75,77,90)', paddingRight: '10px', paddingLeft: '10px', whiteSpace: 'nowrap', ...tabStyle[index], }}
                                onClick={() => setSelectedTab(index)}
                            >{tab}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='bg-secondary'>
                <h1>{tabs[selectedTab]}</h1>
                porta. Integer semper maximus erat, vel posuere libero fermentum ut. Quisque
                convallis imperdiet diam, eget mollis risus semper non. Quisque dictum feugiat finibus. Nulla quis lectus
                augue. Fusce id nulla quis ipsum consequat consectetur in sed felis. Nullam eu urna sollicitudin, sodales
                risus sit amet, lacinia magna. Mauris placerat metus vitae urna efficitur rutrum. Mauris lobortis ut ex
                vitae condimentum. Integer venenatis urna ut lectus efficitur pretium. Donec ut ullamcorper urna, nec
                commodo est. Fusce in nibh sed lectus laoreet fermentum vestibulum a dolor. Donec pulvinar urna sed leo
                consequat, et vulputate nunc pellentesque. Maecenas ex nisl, pretium sed efficitur vitae, ultricies ut
                risus.porta. Integer semper maximus erat, vel posuere libero fermentum ut. Quisque
                convallis imperdiet diam, eget mollis risus semper non. Quisque dictum feugiat finibus. Nulla quis lectus
                augue. Fusce id nulla quis ipsum consequat consectetur in sed felis. Nullam eu urna sollicitudin, sodales
                risus sit amet, lacinia magna. Mauris placerat metus vitae urna efficitur rutrum. Mauris lobortis ut ex
                vitae condimentum. Integer venenatis urna ut lectus efficitur pretium. Donec ut ullamcorper urna, nec
                commodo est. Fusce in nibh sed lectus laoreet fermentum vestibulum a dolor. Donec pulvinar urna sed leo
                consequat, et vulputate nunc pellentesque. Maecenas ex nisl, pretium sed efficitur vitae, ultricies ut
                risus.
            </div>
            {/* <Test1 tabs={tabList} /> */}

        </>
    )
}

const tabContainerStyle = {
    fontSize:'16px',
    height: '24px',
    overflow: 'hidden',
    cursor: 'pointer'
}
const selectedTabStyle = {
    minWidth: '15rem'
}
const beforeTabStyle = {
    borderRadius: '150px'
}