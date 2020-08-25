import React from 'react';
import { Tag } from './Tag';
import './TagList.css';

interface IProps {
    tags: string[];
}

export function TagList(props: IProps) {
    return (
        <div className={"image-modal-tags"}>
            { props.tags.map(tag => <Tag 
                text={tag} onClick={() => {
                    console.log('clicked', tag);
                }} 
                onClickDelete={() => {
                    console.log('delete-a-tag', tag);
                }}
            />) }
        </div>
    )
}