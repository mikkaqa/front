import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { defaultEditor} from "./defaultEditor.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage/localStorageUtils.ts";

const store = createStore(editorReducer, loadFromLocalStorage() ?? defaultEditor);

store.subscribe(() => {saveToLocalStorage(store.getState())});

export {
    store
}