import { EditorType } from "./editorType.ts";
import { SlideImage } from "./PresentationTypes";
import { uuidV4 } from "./utils/uuidV4.ts"


function addImageToSlide(editor: EditorType, src: string, width: number, height: number): EditorType {
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newImage: SlideImage = {
        id: uuidV4(),
        pos: {x: 10, y: 10},
        size: {width: width * 0.2, height: height * 0.2},
        type: 'SlideImage',
        src: src,
    }

    const updatedSlides = editor.presentation.slides.map(Slide => {
        if (Slide.id === editor.selection?.selectedSlideId) {
            return {
                ...Slide,
                elements: [...Slide.elements, newImage],
            };
        }
        return Slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    }
}

export {
    addImageToSlide,
}