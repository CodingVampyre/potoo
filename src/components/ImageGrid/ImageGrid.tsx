import * as React from 'react';
import './ImageGrid.css';
import { Storage } from '../../classes/storage.object';

const { ipcRenderer } = window.require('electron');

export function ImageGrid() {

    ipcRenderer.on('fileLoadedIntoMemory', (event, images: Uint8Array[]) => {
        console.log('images', images);
    });

    return (
        <div className={"image-grid-master"} >
            <button onClick={() => ipcRenderer.send('openImageFileDialog')}>Add Image</button>
        </div>
    );
}