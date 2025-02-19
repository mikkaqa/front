import { SlideImage } from "../../store/PresentationTypes";
import { CSSProperties } from "react";

type SlideImageProps = {
    imageObject: SlideImage,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected}: SlideImageProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.y * scale}px`,
        left: `${imageObject.pos.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        zIndex: 3,
        border: isSelected ? '3px solid #0b57d0' : 'none',
    }
    return (
        <img style={imageObjectStyles} src={`${imageObject.src}`} />
    )
}
export {
    ImageObject,
}