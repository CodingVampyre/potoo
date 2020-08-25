import React from 'react';
import './Tag.css';

interface IProps {
    text: string;
    onClick: () => void;
    onClickDelete: () => void;
}

export function Tag(props: IProps) {
    return <div className="tag-master">
        <span className={"tag-x"} onClick={() => props.onClickDelete()}/>
        <span className={"tag-text"} onClick={() => props.onClick()}>{ ' ' + props.text }</span>
    </div>
}