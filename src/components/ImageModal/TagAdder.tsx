import React, { useState } from 'react';
import './TagAdder.css';

interface IProps {
    onAddtag: (text: string) => void;
}

export function TagAdder(props: IProps) {

    const [text, setText] = useState('');

    return (
        <div className={"tag-adder-master"}>
            <input 
                type="text" 
                className={"tag-adder-input"} 
                placeholder={"add new tag"}
                onChange={(event) => setText(event.target.value)}
            />
            <button 
                className={"tag-adder-button"}
                onClick={() => {
                    props.onAddtag(text.trim().toLowerCase()); // todo text input must be emptied
                }}
            >+</button>
        </div>
    );
}