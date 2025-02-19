import { SlideType } from "./PresentationTypes";

function changeTextFontFamily(slide: SlideType, elementId: string, newFontFamily: string): SlideType {

    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                fontFamily: newFontFamily
            } : item
        ),
    };

}

export {
    changeTextFontFamily,
}