import * as React from 'react';
import './PreviewImage.css';

export function PreviewImage(props: {
    imageBase64: string;
}) {
    return (
        <div 
            className={"preview-image-master"}
            onContextMenu={() => {
                console.log('right click opens context menu');
            }}
        >
            <img 
                src={`data:image/png;base64, ${props.imageBase64}`} 
                className={"preview-image-image"}
                alt="error"
            />
        </div>
    );
}