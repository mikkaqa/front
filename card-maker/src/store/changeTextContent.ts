import { SlideText } from "./PresentationTypes";
import {EditorType} from "./editorType.ts";

function changeTextContent(editor: EditorType, elementId: string, newText: string): EditorType {
    for (let j = 0; j < editor.presentation.slides.length; j++) {
        const slide = editor.presentation.slides[j];
        for (let i = 0; i < slide.elements.length; i++) {
            const element = slide.elements[i];
            if (elementId === element.id) {
                const elements = [...slide.elements];
                const textElement = elements[i] as SlideText;
                elements[i] = {
                    ...textElement,
                    value: newText,
                }
                const slides = [...editor.presentation.slides];
                slides[j] = {
                    ...(slides[j]),
                    elements,
                };
                return {
                    ...editor,
                    presentation: {
                        ...editor.presentation,
                        slides,
                    }
                };
            }
        }
    }
    throw new Error('Yt');
}

export {
    changeTextContent,
}