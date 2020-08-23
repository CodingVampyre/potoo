import * as React from 'react';
import { useState } from 'react';
import './ImageModal.css';

interface IProps {
    onClickBackground: () => void;
    imageBase64: string;
    isVisible: boolean;
}

export function ImageModal(props: IProps) {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            {isVisible && 
                <div className={"image-modal-master"}>
                    <div 
                        className={"image-modal-background"}
                    />
                    <div className="image-modal-wrapper">
                        <img 
                            draggable={false}
                            className={"image-modal-image"} 
                            src={`data:image/png;base64, ${props.imageBase64}`}
                        />
                        <div className={"image-modal-buttons"}>
                            <button className={"image-modal-button critical separate"}>Delete</button>
                            <button className={"image-modal-button neutral"}>Manage Tags</button>
                            <button className={"image-modal-button neutral"} onClick={() => props.onClickBackground()}>Close</button>
                        </div>
                    </div>
                 </div>
            } 
        </>
    )
}
