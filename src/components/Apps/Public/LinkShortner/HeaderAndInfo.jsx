import React from 'react'

export default function HeaderAndInfo() {
    const bigUrl = 'https://chart.apis.google.com/chart?chs=500x500&chma=0,0,100,100&cht=p&chco=FF0000%2CFFFF00%7CFF8000%2C00FF00%7C00FF00%2C0000FF&chd=t%3A122%2C42%2C17%2C10%2C8%2C7%2C7%2C7%2C7%2C6%2C6%2C6%2C6%2C5%2C5&chl=122%7C42%7C17%7C10%7C8%7C7%7C7%7C7%7C7%7C6%7C6%7C6%7C6%7C5%7C5&chdl=android%7Cjava%7Cstack-trace%7Cbroadcastreceiver%7Candroid-ndk%7Cuser-agent%7Candroid-webview%7Cwebview%7Cbackground%7Cmultithreading%7Candroid-source%7Csms%7Cadb%7Csollections%7Cactivity|Chart';
    return (
        <>
            <div className='m-0' style={{ color: "white", textAlign: 'justify' }}>
                <h1 className='bg-primary m-0 p-2'>Shrink Your URL</h1>
                <div className='px-3 pt-2 pb-0'>While sharing or storing link of any image or website from the browser takes to much space and makes our notes or messages look ugly and unattractive. For solving this problem, you can use our url-shortner which will shrink any big and clumsy url into a small and beautiful link which then can be shared anywhere. Here is a sample.</div>
                <div className='px-3 pt-3' style={{ textAlign: 'left' }}>Long and Cumbersome URL - <a href={bigUrl}>{bigUrl}</a></div>
                <div className='px-3 pt-1 pb-2'>Shrinked URL - <a href="https://balibabu.github.io/myapp#/a/2">balibabu.github.io/myapp#/a/2</a></div>
            </div>
        </>
    )
}
