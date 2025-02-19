import { SlideType } from "./PresentationTypes";

function changeTextFontSize(slide: SlideType, elementId: string, newSize: {width: number, height: number}): SlideType {

    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                size: newSize
            } : item
        ),
    };

}

export {
    changeTextFontSize,
}