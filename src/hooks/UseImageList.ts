import { useState } from 'react';
const { ipcRenderer } = window.require('electron');

interface IImage {
    id: string;
    image: string;
    tags: string[];
}

interface IUseImageListHook {
    images: IImage[];
    fetchImages: () => void;
    storeImages: (images: string[]) => void; 
    openImageFileDialog: () => void;
}

export function useImageList(): IUseImageListHook {

    const [images, setImages] = useState<IImage[]>([]);

    ipcRenderer.on('log', (event, message: string) => { console.log(message); })

    ipcRenderer.on('openImageFileDialogResult', (event, images: string[]) => {
        console.log('[openImageFileDialogResult]', images);
        storeImages(images);
    });

    ipcRenderer.on('fetchImagesResult', (event, images: IImage[]) => {
        console.debug('[fetchImagesResult]', images);
        setImages(images);
    });

    ipcRenderer.on('storeImageResult', (event) => {
        console.debug('[storeImageResult]');
    });

    function fetchImages() {
        console.log('r --> e (fetchImages)');
        ipcRenderer.send('fetchImages');
    }

    function storeImages(images: string[]) {
        console.log('r --> e (storeImages)');
        ipcRenderer.send('storeImages', images);
    }

    function openImageFileDialog() {
        console.log('r --> e (openImageFileDialog)');
        ipcRenderer.send('openImageFileDialog');
    }

    return { images, fetchImages, storeImages, openImageFileDialog };
}