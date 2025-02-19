import { EditorType } from "./editorType.ts";
import { Background } from "./PresentationTypes";


function changeSlideBgrImage(editor: EditorType, payload: Background): EditorType {

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection?.selectedSlideId) {
            return {
                ...Slide,
                background: payload,
            };
        }
        return Slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}

export {
    changeSlideBgrImage,
}