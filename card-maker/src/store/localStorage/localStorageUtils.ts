import { EditorType } from "../editorType.ts";
import { validateEditor } from "./validation";

function saveToLocalStorage(editor: EditorType) {

    try {
        if(!validateEditor(editor)) {
            console.error('Validate Error', validateEditor.errors)
            throw new Error('Invalid data save')
        }
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
        console.log("The editor state was successfully saved to localStorage.");
    }
    catch (err) {
        console.error('Error saving to LS:', err);
    }

};

function loadFromLocalStorage(): EditorType | null {

    try {
        const serializedState = localStorage.getItem('presentationEditor');

        if (serializedState === null) {
            console.warn("No data in localStorage.");
            return null;
        }


        const editor = JSON.parse(serializedState) as EditorType;

        if (!validateEditor(editor)) {
            console.error("Validation error when loading from localStorage:", validateEditor.errors);
            throw new Error("Data from localStorage was not validated.");
        }

        console.log("Editor state successfully loaded from localStorage.");
        return editor;

    }
    catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }

}

export {
    saveToLocalStorage,
    loadFromLocalStorage,
}