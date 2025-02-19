import { EditorType } from "./editorType.ts";
import { SlideElement } from "./PresentationTypes";

function resizeSlideElement(
    currentEditor: EditorType,
    slideId: string,
    elementId: string,
    newWidth: number,
    newHeight: number,
    newX: number,
    newY: number,
): EditorType {

    const slide = currentEditor.presentation.slides.find(s => s.id === slideId);

    if (!slide) {
        return currentEditor;
    }

    const element = slide.elements.find(el => el.id === elementId);
    if (!element) {
        return currentEditor
    };

    const updatedElem: SlideElement = {
        ...element,
        size: { width: newWidth, height: newHeight },
        pos: { x: newX, y: newY },
    }

    const updatedElems = slide.elements.map(el => el.id === elementId ? updatedElem : el);
    const updatedSlide = { ...slide, elements: updatedElems };

    return {
        ...currentEditor,
        presentation: {
            ...currentEditor.presentation,
            slides: currentEditor.presentation.slides.map(s => s.id === slideId ? updatedSlide : s)
        }
    };
}

export {
    resizeSlideElement,
}