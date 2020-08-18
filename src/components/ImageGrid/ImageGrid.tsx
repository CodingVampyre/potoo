import * as React from 'react';
import { useEffect, useState } from 'react';
import './ImageGrid.css';
import { Storage } from '../../classes/storage.object';
import { PreviewImage } from './PreviewImage';

const { ipcRenderer } = window.require('electron');

export function ImageGrid() {

    let [displayImages, setDisplayImages] = useState<string[]>([]);

    ipcRenderer.on('fileLoadedIntoMemory', (event, images: string[]) => {
        setDisplayImages(images);
    });

    return (
        <div className={"image-grid-master"} >
            { displayImages.map(displayImage => <PreviewImage base64Image={ displayImage } key={displayImage} />) }
            <button onClick={() => ipcRenderer.send('openImageFileDialog')}>Add Image</button>
        </div>
    );
}