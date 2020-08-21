import * as React from 'react';
import './PreviewImage.css';

export function PreviewImage(props: {
    base64Image: string;
}) {
    return (
        <div className={"preview-image-master"}>
            <img 
                src={`data:image/png;base64, ${props.base64Image}`} 
                className={"preview-image-image"}
                alt="error"
            />
        </div>
    );
}