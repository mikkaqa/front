import { EditorType } from "./editorType.ts";
import { SetSelectionAction } from "./redux/actions.ts";

function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {
    return {
        ...editor,
        selection: action.payload,
    }
}

export {
    setSelection
}