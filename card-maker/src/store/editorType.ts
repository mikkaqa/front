import { Presentation } from "./PresentationTypes.ts";

type SelectionType = {
    selectedSlideId: string | null,
    selectedObjectId: string | null,
}
type EditorType = {
    presentation: Presentation,
    selection?: SelectionType,
}

export type {
    EditorType,
    SelectionType,
}