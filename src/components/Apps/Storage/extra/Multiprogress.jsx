import React, { useEffect, useState } from 'react'
import { averageProgress } from '../../Photo/utility/progressHandler'

export default function Multiprogress(props) {
    const { progressList,
        fontSize = '1rem',
        title = '', css = 'my-2 mx-3',
        height = '1.5rem',
        h1 = '1.5rem', h2 = '.5rem',
        css1 = 'rounded-0', css2 = 'rounded-0 text-info',
        bg1 = 'success', bg2 = 'info',
    } = props;

    const [av, setAv] = useState(0);
    useEffect(() => {
        setAv(averageProgress(progressList).toFixed(0));
    }, [progressList])


    return (
        <>
            {av > 0 &&
                <div className={`position-relative rounded-3 overflow-hidden ` + css} style={{ height }}>
                    <span className='ps-1 bg-primary' style={{ fontSize, position: 'absolute', zIndex: '1' }}>{av}%</span>

                    <div style={{ height: h1 }} className={"progress position-relative " + css1}>
                        <div className={"progress-bar progress-bar-striped progress-bar-animated bg-" + bg1} style={{ width: `${av}%` }}></div>
                        <div className='position-absolute start-50 top-50 translate-middle text-black'>{title}</div>
                    </div>

                    <div className='row m-0' style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                        {progressList.map((progress, index) => {
                            return (
                                <div className='col ps-0 pe-0' key={index}>
                                    <div style={{ height: h2 }} className={"progress position-relative " + css2}>
                                        <div className={"progress-bar bg-" + bg2}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </>
    )
}
