import React from 'react'

export default function HeaderAndInfo() {
    return (
        <>
            <div className='m-0' style={{ color: "white" }}>
                <h1 className='bg-primary m-0 p-2'>Shrink Your URL</h1>
                <div className='px-3 pt-2 pb-0'>While sharing or storing link of any image or website from the browser takes to much space and makes our notes or messages look ugly and unattractive. For solving this problem, you can use our url-shortner which will shrink any big and clumsy url into a small and beautiful link which then can be shared anywhere. Here is a sample.</div>
                <div className='px-3 pt-3'>Long and Cumbersome URL - https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?cs=srgb&dl=pexels-wojciech-kumpicki-2071882.jpg&fm=jpg</div>
                <div className='px-3 pt-1 pb-2'>Shrinked URL - balibabu.github.io/myapp#/a/t</div>
            </div>
        </>
    )
}
