import * as React from 'react';
import { useState } from 'react';
import './ImageModal.css';

interface IProps {
    imageBase64: string,
}

export function ImageModal(props: IProps) {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            {isVisible && 
                <div className={"image-modal-master"}>
                    <div 
                        className={"image-modal-background"}
                        onClick={() => setIsVisible(false)}
                    />
                    <div className="image-modal-wrapper">
                        <img 
                            className={"image-modal-image"} 
                            src={`data:image/png;base64, ${props.imageBase64}`}
                        />
                    </div>
                 </div>
            } 
        </>
    )
}
