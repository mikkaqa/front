import { SlideText } from "../../store/PresentationTypes";
import { CSSProperties} from "react";
import { useState } from "react";
import { useAppActions } from "../hooks/useAppActions.ts";

type TextObjectProps = {
    textObject: SlideText,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const { changeTextContent } = useAppActions();
    const [ isEditing, setEditing ] = useState(false);

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.pos.y * scale}px`,
        left: `${textObject.pos.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        zIndex: 3,
        margin: 0,
        border: isSelected ? '3px solid #0b57d0' : 'none',
        color: isSelected ? '#000000' : '#000000',
    }

    const handleDoubleClick = () => { setEditing(true); };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTextContent(textObject.id, e.target.value);
    };

    const handleBlur = () => {
        setEditing(false);
    };
    return (
        <>
            {isEditing ? (
                <input type="text"
                       value={textObject.value}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       autoFocus
                       style={{
                           ...textObjectStyles,
                           fontSize: `${textObject.fontSize * scale}px`,
                           backgroundColor: 'transparent',
                           outline: 'none',
                       }}
                />
            ) : (
                <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
                    {textObject.value}
                </p>
            )}
        </>
    )
}

export {
    TextObject,
}