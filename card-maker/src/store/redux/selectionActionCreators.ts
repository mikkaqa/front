import { SelectionType } from "../editorType.ts";
import { ActionType } from "./actions";

function setSelection(newSelection: SelectionType) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}

export {
    setSelection,
}