import * as React from 'react';
import './popup.css';
import { closeIcon } from './icons';

const Popup = (props)=>{
    console.log('props',props);
    return (
    <div className="popup">
        <div className='flex flex-col max-w-sm border p-4 rounded-lg bg-green-100 popup-innter-container'>
        <button onClick={()=>props.close(false)} className='mb-2'><span>{closeIcon}</span></button>
            {props.children?props.children:<h1>Welcome To The Popup</h1>}
        </div>            
    </div>)
}

export default Popup;