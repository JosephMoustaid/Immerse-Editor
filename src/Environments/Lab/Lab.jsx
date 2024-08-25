import React from 'react';
import LabScene from "./LabScene.jsx";

function Lab({ video, pdf, assets=[], user }) {
    return (
        <>
            <LabScene video={video} pdf={pdf} assets={assets}  />

            <div className='rounded assets'>
                <ol>
                    <li><strong>Document </strong>: {pdf && pdf.url ? <a href={pdf.url}>Download PDF</a> : "No PDF available"}</li>
                    <li><strong>Assets</strong>:
                        <ul>
                            {assets && assets.length > 0 ? assets.map((asset, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {asset.name || "Unnamed Asset"}
                                    <br />
                                </li>
                            )) : <li>No assets available</li>}
                        </ul>
                    </li>
                    <li><strong>More Information</strong>:</li>
                </ol>
            </div>

            <div className="rounded leave-link">
                <a href="#" className='link-light'><i className="bi bi-box-arrow-left"></i> <span className='ps-1'>Leave</span></a>
            </div>

            <div className="top-assets">
                {video && video.embedCode ? (
                    <div className="asset-item">

                        {/*<div dangerouslySetInnerHTML={{ __html: video.embedCode }} /> */}
                    </div>
                ) : <div className="asset-item">No video available</div>}

                {assets && assets.length > 0 ? assets.map((asset, index) => (
                    <div className="asset-item" key={index}>
                        {asset.name || "Unnamed Asset"}
                    </div>
                )) : <div className="asset-item">No assets available</div>}
            </div>
        </>
    );
}

export default Lab;
