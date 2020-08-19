import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

interface IImage {
    id: string;
    image: string;
    tags: string[];
}

export function useImageList(): [IImage[], () => void, (images: string[]) => void] {

    const [images, setImages] = useState<IImage[]>([]);

    useEffect(() => {
        fetchImages();
    }, []);

    ipcRenderer.on('fetchedImages', (event, images: IImage[]) => {
        console.debug('fetched images', images);
        setImages(images);
    });

    ipcRenderer.on('storedImages', (event) => {
        console.debug('stored image');
        fetchImages();
    });

    function fetchImages() {
        ipcRenderer.send('fetchImages');
    }

    function storeImages(images: string[]) {
        ipcRenderer.send('storeImages', images);
    }

    return [images, fetchImages, storeImages];
}