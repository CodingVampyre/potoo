import * as React from 'react';
import './ImageGrid.css';
import { PreviewImage } from './PreviewImage';
import { useImageList } from '../../hooks/UseImageList';
import { ImageList } from './ImageList';

export function ImageGrid() {

    const { images, openImageFileDialog, } = useImageList();

    return (
        <div className={"image-grid-master"} >
            <ImageList images={ images } />
            <button onClick={() => openImageFileDialog()}>Add Image</button>
        </div>
    );
}
