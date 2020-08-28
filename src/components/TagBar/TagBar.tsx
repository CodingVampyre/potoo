import * as React from 'react';
import './TagBar.css';
import { TagSearch } from './TagSearch';
import { useState } from 'react';
import { Tag } from '../ImageModal/Tag';

interface IProps {
    onStartSearchTags: (tags: string[]) => void;
}

export function TagBar(props: IProps) {

    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className={"tag-bar-master"}>
            <TagSearch 
                onClickSearchButton={ (tags) => props.onStartSearchTags(tags) }
                onEnterText={ (newTags) => setTags(newTags) }
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