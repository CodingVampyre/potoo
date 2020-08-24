import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
const { ipcRenderer } = window.require('electron');

export interface IImage {
    id: string;
    imageBase64: string;
    tags: string[];
}

interface IUseImageListHook {
    images: IImage[];
    fetchImages: () => void;
    openImageFileDialog: () => void;
    deleteImage: (id: string) => void;
}

export function useImageList(): IUseImageListHook {

    const [images, setImages] = useState<IImage[]>([]);

    useEffect(() => {
        ipcRenderer.on('fetchImagesResult', (event, images: IImage[]) => {
            setImages(images);
        });

        ipcRenderer.on('storeImageResult', (event) => {
            fetchImages();
        });

        ipcRenderer.on('openImageFileDialogResult', (event, imagesBase64: string[]) => {
            const images: IImage[] = imagesBase64.map(imageBase64 => {
                return { id: uuid(), imageBase64, tags: [], }
            });
            storeImages(images);
        });

        ipcRenderer.on('deleteImageResult', () => {
            console.log('image was removed');
        });
    }, []);

    useEffect(() => {
        fetchImages();
    }, []);

    /** */
    function fetchImages() {
        ipcRenderer.send('fetchImages');
    }

    /** */
    function storeImages(images: IImage[]) {
        ipcRenderer.send('storeImages', images);
    }

    /** */
    function openImageFileDialog() {
        ipcRenderer.send('openImageFileDialog');
    }

    /** */
    function deleteImage(id: string) {
        ipcRenderer.send('deleteImage', id);
        fetchImages();
    }

    return { images, fetchImages, openImageFileDialog, deleteImage };
}
