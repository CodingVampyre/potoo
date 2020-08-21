import * as React from 'react';
import { IImage } from '../../hooks/UseImageList';
import { PreviewImage } from './PreviewImage';
import './ImageList.css';

interface IProps {
    images: IImage[];
}

export function ImageList(props: IProps) {
    return (
        <div className={"image-list-master"}>
            { props.images.map(image => <PreviewImage imageBase64={ image.imageBase64 } key={ image.id }/>) }
        </div>
    );
}