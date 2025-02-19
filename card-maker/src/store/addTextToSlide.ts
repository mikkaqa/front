import { EditorType } from "./editorType.ts";
import { SlideText } from "./PresentationTypes";
import { uuidV4 } from "./utils/uuidV4.ts";


function addTextToSlide(editor: EditorType): EditorType {

    const newText = "Введите текст";

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newTextObject: SlideText = {
        id: uuidV4(),
        pos: {x: 200, y: 400},
        size: {width: 200, height: 30},
        type: 'SlideText',
        value: newText,
        fontFamily: 'Arial',
        fontSize: 16,
        fontColor: '#000000',
    }

    const updatedSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection?.selectedSlideId) {
            return {
                ...Slide,
                elements: [...Slide.elements, newTextObject],
            };
        }
        return Slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
}

export {
    addTextToSlide,
}
