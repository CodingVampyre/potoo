import * as React from 'react';
import './PreviewImage.css';

export function PreviewImage(props: {
    imageBase64: string;
    onClick?: () => void;
}) {
    return (
        <div 
            className={"preview-image-master"}
            onClick={() => props.onClick ? props.onClick() : undefined}
        >
            <img 
                draggable={false}
                src={`data:image/png;base64, ${props.imageBase64}`} 
                className={"preview-image-image"}
                alt="error"
            />
        </div>
    );
}