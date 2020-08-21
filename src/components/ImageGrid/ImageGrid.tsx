import * as React from 'react';
import './ImageGrid.css';
import { PreviewImage } from './PreviewImage';
import { useImageList } from '../../hooks/UseImageList';

export function ImageGrid() {

    const { images, fetchImages, openImageFileDialog, } = useImageList();

    return (
        <div className={"image-grid-master"} >
            { images.map(image => <PreviewImage base64Image={ image.image } key={ image.id }/>) }
            <button onClick={() => openImageFileDialog()}>Add Image</button>
            <button onClick={() => fetchImages()}>Fetch Images</button>
        </div>
    );
}