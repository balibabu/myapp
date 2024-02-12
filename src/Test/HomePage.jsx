import image from '../images/AppIcon/lunar.png';
import React from 'react'

export default function HomePage() {
    return (
        <div className='row m-0'>
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
            <AppIcon />
        </div>
    )
}
function AppIcon() {
    return (
        <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 col-4 p-0 text-center mb-2 px-1'
        style={{cursor:'pointer'}}>
        
            <div className='rounded-4' style={{backgroundColor:'#edede9'}}>
                <img src={image} alt={'appname'} className='col-12'/>
                <hr className='p-0 m-0'/>
                <div className=''>Appname</div>
            </div>
        </div>
    );
}