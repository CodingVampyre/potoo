import React, {useEffect} from 'react';
import './ImageModal.css';
import { IImage } from '../../hooks/UseImageList';
import { TagList } from './TagList';
const { ipcRenderer } = window.require('electron');

interface IProps {
    onClickBackground: () => void;
    onClickDelete: (id: string) => void;
    onNavigateImages: (direction: -1 | 1) => void;
    onAddTag: (text: string) => void;
    isVisible: boolean;
    image: IImage;
}

export function ImageModal(props: IProps) {

    useEffect(() => {

        function keyDownListener(event: any) {
            if (event.key === 'ArrowLeft') { props.onNavigateImages(-1); } 
            else if (event.key === 'ArrowRight') { props.onNavigateImages(1); }
        }

        document.addEventListener('keydown', keyDownListener);
        return () => { document.removeEventListener('keydown', keyDownListener); }
    }, [props]);

    return (
        <div className={"image-modal-master"} ref={e => e?.click()}>
            <div
                className={"image-modal-background"}
            />
            <div className="image-modal-wrapper">
                <TagList 
                    tags={ props.image.tags } 
                    onAddTag={(text) => props.onAddTag(text)}
                />
                <div className={"image-modal-content"}>
                    <img
                        alt={props.image.id}
                        draggable={false}
                        className={"image-modal-image"}
                        src={`data:image/png;base64, ${props.image.imageBase64}`}
                    />
                    <div className={"image-modal-buttons"}>
                        <button className={"image-modal-button critical separate"} onClick={() => props.onClickDelete(props.image.id)}>Delete</button>
                        <button className={"image-modal-button neutral"}>Manage Tags</button>
                        <button className={"image-modal-button neutral"} onClick={() => props.onClickBackground()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
