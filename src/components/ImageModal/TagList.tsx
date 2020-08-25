import React from 'react';
import { Tag } from './Tag';
import './TagList.css';
import { TagAdder } from './TagAdder';

interface IProps {
    tags: string[];
    onAddTag: (text: string) => void;
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
            <TagAdder 
                onAddtag={(text: string) => props.onAddTag(text)}
            />
        </div>
    )
}