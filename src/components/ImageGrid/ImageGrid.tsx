import * as React from 'react';
import './ImageGrid.css';
import { IImage } from '../../hooks/UseImageList';
import { ImageList } from './ImageList';
import { ImageModal } from '../ImageModal/ImageModal';

interface IProps {
    images: IImage[];
    onClickAddImageButton: () => void;
    onDeleteImage: (id: string) => void;
    onUpdateTags: (id: string, newTags: string[]) => void;
}

export function ImageGrid(props: IProps) {

    const [currentlySelectedImage, setCurrentlySelectedImage] = React.useState<number | undefined>(undefined);

    return (
        <div className={"image-grid-master"} >
            <ImageList 
                images={ props.images } 
                onSelectImage={(index) => setCurrentlySelectedImage(index)}
            />
            <button onClick={() => props.onClickAddImageButton}>Add Image</button>
            {
                currentlySelectedImage !== undefined && 
                props.images[currentlySelectedImage] !== undefined && 
                    <ImageModal 
                        image={ props.images[currentlySelectedImage] }
                        isVisible={currentlySelectedImage !== undefined}
                        onClickBackground={() => setCurrentlySelectedImage(undefined)}
                        onClickDelete={(id: string) => {
                            setCurrentlySelectedImage(undefined);
                            props.onDeleteImage(id);
                        }}
                        onNavigateImages={(direction) => {
                            setCurrentlySelectedImage(current => {
                                if (current !== undefined) {
                                    const next = current + direction;
                                    if (next < 0 || next >= props.images.length) { return current; }
                                    return next;
                                }
                                return undefined;
                            });
                        }}
                        onAddTag={(text) => {
                            const newTags = [...props.images[currentlySelectedImage].tags, text];
                            props.onUpdateTags(props.images[currentlySelectedImage].id, newTags)
                        }}
                    />
            }
        </div>
    );
}
