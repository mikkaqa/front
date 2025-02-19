import styles from './TopPanel.module.css';
import React from "react";
import { useAppSelector } from '../hooks/useAppSelector';
import { dispatch } from '../../store/editor';
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';

function TopPanel() {
    const title = useAppSelector((editor) => editor.presentation.title);
    const [inputValue, setInputValue] = React.useState(title);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        dispatch(renamePresentationTitle, newValue);
    };

    React.useEffect(() => {
        if (inputRef.current) {
            const tempSpan = document.createElement("span");
            tempSpan.style.visibility = "hidden";
            tempSpan.style.whiteSpace = "pre";
            tempSpan.innerText = inputValue || " ";
            document.body.appendChild(tempSpan);
            const width = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            if (inputRef.current) {
                inputRef.current.style.width = `${width + 7}px`;
            }
        }
    }, [inputValue]);

    React.useEffect(() => {
        setInputValue(title);
    }, [title]);

    return (
        <div className={styles.TopPanel}>
            <input
                ref={inputRef}
                className={styles.title}
                type="text"
                value={inputValue}
                onChange={onTitleChange}
                style={{ transition: "width 0.2s ease" }}
                maxLength={45}
            />
        </div>
    );
}

export {
    TopPanel
};
