import { EditorType } from "./editorType.ts";

function removeSlideElement(editor: EditorType): EditorType {

    if (!editor.selection) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlideId;
    const removeObjectId = editor.selection.selectedObjectId;
    const targetSlide = editor.presentation.slides.find(Slide => Slide.id === selectedSlideId);

    if (!targetSlide) {
        return editor;
    }

    const newContent = targetSlide.elements.filter(elements => elements.id !== removeObjectId);
    const newSelectedObjectId = null;

    return {

        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(Slide =>
                Slide.id === selectedSlideId ? {
                    ...Slide,
                    elements: newContent,
                } : Slide
            ),
        },
        selection: {
            selectedSlideId: selectedSlideId,
            selectedObjectId: newSelectedObjectId,
        },
    };

}

export {
    removeSlideElement,
}