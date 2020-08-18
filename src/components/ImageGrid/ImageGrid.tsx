import * as React from 'react';
import { useEffect, useState } from 'react';
import './ImageGrid.css';
import { Storage } from '../../classes/storage.object';

const { ipcRenderer } = window.require('electron');

export function ImageGrid() {

    let [displayImages, setDisplayImages] = useState<string[]>([]);

    ipcRenderer.on('fileLoadedIntoMemory', (event, images: string[]) => {
        setDisplayImages(images);
    });

    return (
        <div className={"image-grid-master"} >
            <button onClick={() => ipcRenderer.send('openImageFileDialog')}>Add Image</button>
            { displayImages.map(displayImage => <div key={displayImage}>
                <img src={`data:image/png;base64, ${displayImage}`} alt={'broken image'} />
            </div>) }
            <p>{displayImages.length}</p>
        </div>
    );
}