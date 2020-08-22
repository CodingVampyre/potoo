import * as React from 'react';
import './ImageGrid.css';
import { useImageList } from '../../hooks/UseImageList';
import { ImageList } from './ImageList';
import { ImageModal } from '../ImageModal/ImageModal';

export function ImageGrid() {

    const { images, openImageFileDialog, } = useImageList();
    const [currentlySelectedImage, setCurrentlySelectedImage] = React.useState<number | undefined>(undefined);

    return (
        <div className={"image-grid-master"} >
            <ImageList 
                images={ images } 
                onSelectImage={(index) => {
                    console.log(`selected image nr ${index}`);
                    setCurrentlySelectedImage(index);
                }}
            />
            <button onClick={() => openImageFileDialog()}>Add Image</button>
            {
                currentlySelectedImage !== undefined && 
                images[currentlySelectedImage] !== undefined && 
                    <ImageModal 
                        imageBase64={ images[currentlySelectedImage].imageBase64 }
                        isVisible={currentlySelectedImage !== undefined}
                        onClickBackground={() => setCurrentlySelectedImage(undefined)}
                    />
            }
        </div>
    );
}
