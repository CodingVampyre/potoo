import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
const { ipcRenderer } = window.require('electron');

interface IImage {
    id: string;
    imageBase64: string;
    tags: string[];
}

interface IUseImageListHook {
    images: IImage[];
    fetchImages: () => void;
    openImageFileDialog: () => void;
}

export function useImageList(): IUseImageListHook {

    const [images, setImages] = useState<IImage[]>([]);

    useEffect(() => {
        ipcRenderer.on('fetchImagesResult', (event, images: IImage[]) => {
            console.debug('[fetchImagesResult]', images);
            setImages(images);
        });

        ipcRenderer.on('storeImageResult', (event) => {
            console.debug('[storeImageResult]');
        });

        ipcRenderer.on('openImageFileDialogResult', (event, imagesBase64: string[]) => {
            const images: IImage[] = imagesBase64.map(imageBase64 => {
                return { id: uuid(), imageBase64, tags: [], }
            });
            storeImages(images);
        });
    }, []);

    ipcRenderer.on('log', (event, message: string) => { console.log(message); })

    /** */
    function fetchImages() {
        console.log('r --> e (fetchImages)');
        ipcRenderer.send('fetchImages');
    }

    /** */
    function storeImages(images: IImage[]) {
        console.log('r --> e (storeImages)');
        ipcRenderer.send('storeImages', images);
    }

    /** */
    function openImageFileDialog() {
        ipcRenderer.send('openImageFileDialog');
    }

    return { images, fetchImages, openImageFileDialog };
}
