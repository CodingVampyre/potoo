import * as React from 'react';
import './ImageGrid.css';
import { useImageList } from '../../hooks/UseImageList';
import { ImageList } from './ImageList';
import { ImageModal } from '../ImageModal/ImageModal';

export function ImageGrid() {

    const { images, openImageFileDialog, deleteImage, updateTags } = useImageList();
    const [currentlySelectedImage, setCurrentlySelectedImage] = React.useState<number | undefined>(undefined);

    return (
        <div className={"image-grid-master"} >
            <ImageList 
                images={ images } 
                onSelectImage={(index) => setCurrentlySelectedImage(index)}
            />
            <button onClick={() => openImageFileDialog()}>Add Image</button>
            {
                currentlySelectedImage !== undefined && 
                images[currentlySelectedImage] !== undefined && 
                    <ImageModal 
                        image={ images[currentlySelectedImage] }
                        isVisible={currentlySelectedImage !== undefined}
                        onClickBackground={() => setCurrentlySelectedImage(undefined)}
                        onClickDelete={(id: string) => {
                            setCurrentlySelectedImage(undefined);
                            deleteImage(id);
                        }}
                        onNavigateImages={(direction) => {
                            setCurrentlySelectedImage(current => {
                                if (current !== undefined) {
                                    const next = current + direction;
                                    if (next < 0 || next >= images.length) { return current; }
                                    return next;
                                }
                                return undefined;
                            });
                        }}
                        onAddTag={(text) => {
                            const newTags = [...images[currentlySelectedImage].tags, text];
                            updateTags(images[currentlySelectedImage].id, newTags);
                        }}
                    />
            }
        </div>
    );
}
