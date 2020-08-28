import * as React from 'react';
import './TagBar.css';
import { TagSearch } from './TagSearch';
import { useState } from 'react';
import { Tag } from '../ImageModal/Tag';

export function TagBar() {

    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className={"tag-bar-master"}>
            <TagSearch 
                onClickSearchButton={(tags) => {
                    console.log(tags);
                }}
                onEnterText={(newTags) => {
                    setTags(newTags);
                }}
            />
            {tags.map(tag => <Tag 
                key={tag}
                text={tag}
                onClick={() => {}}
                onClickDelete={() => {}}
            />)}
        </div>
    );
}