import { defaultEditor as editor } from "./redux/defaultEditor.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage/localStorageUtils.ts";
import { EditorType} from "./editorType.ts";

type Handler = () => void;
type ModifyFn = (editor: EditorType, payload: any) => EditorType;

let _editor =  loadFromLocalStorage() || editor
let _handler: Handler | null = null//(() => void) | null

function getEditor() {
    loadFromLocalStorage();
    console.log('изменено', _editor)
    return _editor
}

function setEditor(newEditor: any) {
    _editor = newEditor;
    saveToLocalStorage(_editor);
}

function dispatch(modifyFn: ModifyFn, payload?: any): void {

    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Handler): void {
    _handler = handler
}



export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}
