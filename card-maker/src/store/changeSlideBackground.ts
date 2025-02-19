import { EditorType } from "./editorType.ts";
import { SolidBackground } from "./PresentationTypes";

function changeSlideBackground(editor: EditorType, payload?: object): EditorType {

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const updateSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection?.selectedSlideId) {
            return {
                ...Slide,
                background: payload as SolidBackground,
            };
        }
        return Slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updateSlides,
        }
    }

}

export {
    changeSlideBackground,
}