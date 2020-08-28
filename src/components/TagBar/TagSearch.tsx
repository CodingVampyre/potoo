import * as React from 'react';
import './TagSearch.css';

interface IProps {
    onClickSearchButton: (tags: string[]) => void;
    onEnterText?: (tags: string[]) => void;
}

export function TagSearch(props: IProps) {

    const [input, setInput] = React.useState('');

    function generateTags(input: string): string[] {
        return input === '' ? [] : input.trim().toLocaleLowerCase().split(' ');
    }

    React.useEffect(() => {
        if (props.onEnterText) {
            props.onEnterText(generateTags(input));
        }
    }, [input]);

    return (
        <div className={"tag-search-master"}>
            <input 
                className={"tag-search-input"}
                type={"text"}
                onChange={(event) => {
                    setInput(event.target.value);
                }}
            />
            <button
                className={"tag-search-button"}
                onClick={() => props.onClickSearchButton(generateTags(input))}
            >
                Search
            </button>
        </div>
    );
}