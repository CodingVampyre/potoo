import * as React from 'react';
import './ImageGrid.css';

const { ipcRenderer } = window.require('electron');

export function ImageGrid() {

    ipcRenderer.on('fileLoadedIntoMemory', (event, imagePath) => {
        console.log('file!', imagePath);
    });

    return (
        <div className={"image-grid-master"} >
            I Am The Image Grid
            <button onClick={() => {
                console.log('Pressed The Image!');
                ipcRenderer.send('openImageFileDialog');
            }}>Add Image</button>
        </div>
    );
}