import React from 'react';
import SchoolScene from "./SchoolScene.jsx"
function School({assets}, {user}) {

    return (
        <>
            <SchoolScene />

            <div className='rounded assets' >
                <ol>
                    <li><strong>Document </strong>:</li>
                    <li><strong>Assets</strong> : 
                        <ul>
                            <li>Name : Arduino Card</li>
                        </ul>
                    </li>
                    <li><strong>More Information</strong> :</li>
                </ol>
            </div>

            <div className="rounded leave-link" >
                <a href="" className='link-light'><i className="bi bi-box-arrow-left"></i> <span className='ps-1'>Leave</span></a>
            </div>

            <div className="top-assets" >
                <div className="asset-item">Video</div>
                <div className="asset-item">Arduino Card</div>
            </div>
        </>
    );
}

export default School;


