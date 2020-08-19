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
        ipcRenderer.send('fechImages');
    }

    function storeImages(images: string[]) {
        ipcRenderer.on('storedImage', (event) => {
            fetchImages();
        });
    }

    return [images, fetchImages, storeImages];
}