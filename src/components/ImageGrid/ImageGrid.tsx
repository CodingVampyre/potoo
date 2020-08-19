import * as React from 'react';
import { useEffect, useState } from 'react';
import './ImageGrid.css';
import { PreviewImage } from './PreviewImage';
import { useImageList } from '../../hooks/UseImageList';

const { ipcRenderer } = window.require('electron');

export function ImageGrid() {

    const [images, fetchImages, storeImages] = useImageList();

    ipcRenderer.on('fileLoadedIntoMemory', (event, images: string[]) => {
        storeImages(images);
    });

    return (
        <div className={"image-grid-master"} >
            { images.map(image => <PreviewImage base64Image={ image.image } key={ image.id }/>) }
            <button onClick={() => ipcRenderer.send('openImageFileDialog')}>Add Image</button>
        </div>
    );
}