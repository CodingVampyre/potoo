import * as React from 'react';
import { IImage } from '../../hooks/UseImageList';
import { PreviewImage } from './PreviewImage';
import './ImageList.css';

interface IProps {
    images: IImage[];
    onSelectImage?: (imageIndex: number) => void;
}

export function ImageList(props: IProps) {
    return (
        <div className={"image-list-master"}>
            { props.images.map((image, index) => <PreviewImage 
                imageBase64={ image.imageBase64 } 
                key={ image.id }
                onClick={() => props.onSelectImage ? props.onSelectImage(index) : undefined}
            />) }
        </div>
    );
}