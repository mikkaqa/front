import { EditorType } from "./editorType.ts";
import { SlideType } from "./PresentationTypes";
import {uuidV4} from "./utils/uuidV4.ts";

function addSlide(editor: EditorType): EditorType {
    const newSlide: SlideType = {
        id: uuidV4(),
        elements: [],
        background: {
            type: 'solid',
            color: '#FFFFFF',
        },
    }

    const selectedSlideindex = editor.presentation.slides.findIndex(SlideO => SlideO.id == editor.selection?.selectedSlideId);

    return{
        presentation:{
            ...editor.presentation,
            slides: [...editor.presentation.slides.slice(0, selectedSlideindex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selectedSlideindex + 1)]
        },
        selection: editor.selection

    }
}

export {
    addSlide,
}