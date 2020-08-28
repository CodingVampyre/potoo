import React from 'react';
import { Tag } from './Tag';
import './TagList.css';
import { TagAdder } from './TagAdder';

interface IProps {
    tags: string[];
    onAddTag: (text: string) => void;
    onDeleteTag: (tag: string) => void;
}

export function TagList(props: IProps) {
    return (
        <div className={"image-modal-tags"}>
            { props.tags.map(tag => <Tag
                key={tag} 
                text={tag} 
                onClick={() => {
                    console.log('clicked', tag);
                }} 
                onClickDelete={ () => props.onDeleteTag(tag) }
            />) }
            <TagAdder 
                onAddtag={(text: string) => props.onAddTag(text)}
            />
        </div>
    )
}