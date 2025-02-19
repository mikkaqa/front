import { EditorType, SelectionType } from "../editorType.ts"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    ADD_TEXT = 'addText',
    CHANGE_TEXT_CONTENT = 'CHANGE_TEXT_CONTENT',
    ADD_IMAGE = 'addImage',
    REMOVE_SLIDE_ELEMENT = 'removeSlideElement',
    CHANGE_SLIDE_BACKGROUND = 'changeSlideBackground',
    CHANGE_SLIDE_BACKGROUND_IMAGE = 'changeSlideBgrImage',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    CHANGE_ELEMENT_POSITION = 'changeElementPosition',
    RESIZE_SLIDE_ELEMENT = 'resizeSlideElement',
    SAVE_PRESENTATION = 'savePresentation',
    LOAD_PRESENTATION = 'loadPresentation',
}

type ChangeSlidePositionAction = {
    type: ActionType.CHANGE_SLIDE_POSITION;
    payload: {
        editor: EditorType;
        slideId: string;
        targetSlideId: string;
    };
};

type ChangeElementPositionAction = {
    type: ActionType.CHANGE_ELEMENT_POSITION;
    payload: {
        slideId: string;
        elementId: string;
        x: number;
        y: number;
    };
}

type ResizeSlideElementAction = {
    type: ActionType.RESIZE_SLIDE_ELEMENT
    payload: {
        slideId: string;
        elementId: string;
        width: number;
        height: number;
        x: number;
        y: number;
    };
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type AddTextAction = {
    type: ActionType.ADD_TEXT,
}
type ChangeTextContentAction = {
    type: ActionType.CHANGE_TEXT_CONTENT,
    id: string,
    newText: string,
}

type AddImageAction = {
    type: ActionType.ADD_IMAGE,
    payload: { src: string; width: number; height: number}
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type RemoveSlideElementAction = {
    type: ActionType.REMOVE_SLIDE_ELEMENT
}

type ChangeSlideBgrAction = {
    type: ActionType.CHANGE_SLIDE_BACKGROUND
    payload: {
        type: 'solid';
        color: string
    }
}

type ChangeSlideBgrImageAction = {
    type: ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE
    payload: {
        type: 'image';
        src: string
    }
}

type SavePresentationAction = {
    type: ActionType.SAVE_PRESENTATION;
    payload: EditorType;
};

type LoadPresentationAction = {
    type: ActionType.LOAD_PRESENTATION;
    payload: EditorType;
};

type EditorAction = AddSlideAction | RemoveSlideAction| AddTextAction | AddImageAction| SetSelectionAction | SetEditorAction
    | RemoveSlideElementAction | ChangeSlideBgrAction | ChangeSlideBgrImageAction | ChangeSlidePositionAction | ChangeElementPositionAction
    | ResizeSlideElementAction | SavePresentationAction | LoadPresentationAction | ChangeTextContentAction

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}