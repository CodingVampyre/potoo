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

    function fetchImages() {
        ipcRenderer.on('fetchedImages', (event, images: IImage[]) => {
            setImages(images);
        });
        ipcRenderer.send('fetchImages');
    }

    function storeImages(images: string[]) {
        ipcRenderer.on('storedImages', (event) => {
            fetchImages();
        });
        ipcRenderer.send('storeImages', images);
    }

    return [images, fetchImages, storeImages];
}