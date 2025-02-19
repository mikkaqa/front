import { ActionType } from "./actions"
import { EditorType } from "../editorType.ts";

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
     return {
         type: ActionType.REMOVE_SLIDE,
     }
}

function addTextToSlide() {
    return {
        type: ActionType.ADD_TEXT,
    }
}

function changeTextContent(id: string, newText: string) {
    return{
        type: ActionType.CHANGE_TEXT_CONTENT,
        id,
        newText,
    }
}

function addImageToSlide(src: string, width: number, height: number) {
    return {
        type: ActionType.ADD_IMAGE,
        payload: {
            src,
            width,
            height,
        },
    }
}

function removeSlideElement(){
    return {
        type: ActionType.REMOVE_SLIDE_ELEMENT,
    }
}

function changeSlideBackground(payload: { type: 'solid', color: string }) {
    return {
        type: ActionType.CHANGE_SLIDE_BACKGROUND,
        payload,
    };
}

function changeSlideBgrImage(payload: { type: 'image', src: string }) {
    return {
        type: ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE,
        payload,
    };
}

const changeSlidePosition = (editor: EditorType, slideId: string, targetSlideId: string) => ({
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: {
        editor,
        slideId,
        targetSlideId,
    },
});

const changeElementPosition = (slideId: string, elementId: string, newX: number, newY: number) => ({
    type: ActionType.CHANGE_ELEMENT_POSITION,
    payload: {
        slideId,
        elementId,
        x: newX,
        y: newY,
    },
});

const resizeElementOnSlide = (
    slideId: string,
    elementId: string,
    newWidth: number,
    newHeight: number,
    newX: number,
    newY: number,
) => ({
    type: ActionType.RESIZE_SLIDE_ELEMENT,
    payload: {
        slideId,
        elementId,
        width: newWidth, // Исправлено: используем newWidth и newHeight
        height: newHeight, // Исправлено: используем newWidth и newHeight
        x: newX,
        y: newY,
    },
});

function savePresentation(editor: EditorType) {
    return {
        type: ActionType.SAVE_PRESENTATION,
        payload: editor
    }
}

function loadPresentation(editor: EditorType) {
    return {
        type: ActionType.LOAD_PRESENTATION,
        payload: editor
    }
}

export {
    addSlide,
    removeSlide,
    addTextToSlide,
    changeTextContent,
    addImageToSlide,
    removeSlideElement,
    changeSlideBackground,
    changeSlideBgrImage,
    changeSlidePosition,
    changeElementPosition,
    resizeElementOnSlide,
    savePresentation,
    loadPresentation,
}