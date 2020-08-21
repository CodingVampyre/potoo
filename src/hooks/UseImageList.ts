import { useState } from 'react';
const { ipcRenderer } = window.require('electron');

interface IImage {
    id: string;
    image: string;
    tags: string[];
}

export function useImageList(): [IImage[], () => void, (images: string[]) => void, () => void] {

    const [images, setImages] = useState<IImage[]>([]);

    ipcRenderer.on('log', (event, message: string) => { console.log(message); })

    ipcRenderer.on('fileLoadedIntoMemory', (event, images: string[]) => {
        console.log('fileLoadedIntoMemory', images);
        storeImages(images);
    });

    ipcRenderer.on('fetchedImages', (event, images: IImage[]) => {
        console.debug('fetchedImages', images);
        setImages(images);
    });

    ipcRenderer.on('storedImages', (event) => {
        console.debug('storedImages');
        fetchImages();
    });

    function fetchImages() {
        console.log('fetching images');
        ipcRenderer.send('fetchImages');
    }

    function storeImages(images: string[]) {
        ipcRenderer.send('storeImages', images);
    }

    function openImageFileDialog() {
        ipcRenderer.send('openImageFileDialog');
    }

    return [images, fetchImages, storeImages, openImageFileDialog];
}