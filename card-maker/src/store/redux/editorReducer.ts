import {EditorType} from "../editorType.ts";
import {addSlide} from "../addSlide";
import {removeSlide} from "../removeSlide.ts";
import {addTextToSlide} from "../addTextToSlide.ts";
import {addImageToSlide} from "../addImageToSlide.ts";
import {removeSlideElement} from "../removeSlideElement.ts";
import {defaultEditor} from "./defaultEditor";
import {setSelection} from "../setSelection.ts";
import {ActionType, EditorAction} from "./actions";
import {changeSlidePosition} from "../changeSlidePosition.ts";
import {changeElementPosition} from "../changeElementPosition.ts";
import {changeSlideBackground} from "../changeSlideBackground.ts";
import {changeSlideBgrImage} from "../changeSlideBgrImage.ts";
import {resizeSlideElement} from "../resizeSlideElement.ts";
import {loadFromLocalStorage, saveToLocalStorage} from "../localStorage/localStorageUtils.ts";
import {changeTextContent} from "../changeTextContent.ts";

const initialState: EditorType = loadFromLocalStorage() || defaultEditor;

function editorReducer(editor: EditorType = initialState, action: EditorAction): EditorType {

    let newState: EditorType;

    switch (action.type) {
        case ActionType.ADD_SLIDE:
            newState =  addSlide(editor);
            break;
        case ActionType.REMOVE_SLIDE:
             newState =  removeSlide(editor);
             break;
        case ActionType.ADD_TEXT:
            newState = addTextToSlide(editor);
            break;
        case ActionType.CHANGE_TEXT_CONTENT:
            newState = changeTextContent(editor, action.id, action.newText);
            break;
        case ActionType.ADD_IMAGE:
            newState =  addImageToSlide(editor, action.payload.src, action.payload.width, action.payload.height);
            break;
        case ActionType.SET_SELECTION:
            newState =  setSelection(editor, action);
            break;
        case ActionType.SET_EDITOR:
            newState = action.payload;
            break;
        case ActionType.REMOVE_SLIDE_ELEMENT:
            newState = removeSlideElement(editor);
            break;
        case ActionType.CHANGE_SLIDE_BACKGROUND:
            newState = changeSlideBackground(editor, action.payload);
            break;
        case ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE:
            newState = changeSlideBgrImage(editor, action.payload);
            break;
        case ActionType.CHANGE_SLIDE_POSITION:
            newState = changeSlidePosition(action.payload.editor, action.payload.slideId, action.payload.targetSlideId);
            break;
        case ActionType.CHANGE_ELEMENT_POSITION:
            newState = changeElementPosition(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.x,
                action.payload.y
            );
            break;
        case ActionType.RESIZE_SLIDE_ELEMENT:
            newState = resizeSlideElement(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.width,
                action.payload.height,
                action.payload.x,
                action.payload.y
            );
            break;
        case ActionType.SAVE_PRESENTATION:
            saveToLocalStorage(action.payload);
            return action.payload;
        case ActionType.LOAD_PRESENTATION:
            return loadFromLocalStorage() ?? defaultEditor;
        default:
            return editor
    }

    saveToLocalStorage(newState);

    return newState;
}

export {
    editorReducer,
}