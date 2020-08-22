import * as React from 'react';
import './ImageGrid.css';
import { useImageList } from '../../hooks/UseImageList';
import { ImageList } from './ImageList';
import { ImageModal } from '../ImageModal/ImageModal';

export function ImageGrid() {

    const { images, openImageFileDialog, } = useImageList();

    return (
        <div className={"image-grid-master"} >
            <ImageList images={ images } />
            <button onClick={() => openImageFileDialog()}>Add Image</button>
            {
                images[3] !== undefined && <ImageModal imageBase64={ images[3]?.imageBase64 }/>
            }
        </div>
    );
}
