import React, { useState} from "react";
import { useAppActions } from "./useAppActions.ts";
import { useAppSelector } from "./useAppSelector.ts";

export function useDragAndDropSlide() {
    const [draggingSlide, setDraggingSlide] = useState<string | null>(null);
    const [dragOverSlide, setDragOverSlide] = useState<string | null>(null);

    const { changeSlidePosition } = useAppActions(); // Получаем moveSlide из useAppActions
    const editor = useAppSelector((state) => state); // Получаем editor из Redux

    function handleDragStart(slideId: string) {
        setDraggingSlide(slideId);
    }

    function handleDragOver(e: React.DragEvent, slideId: string) {
        e.preventDefault();
        if (slideId !== dragOverSlide) {
            setDragOverSlide(slideId);
        }
    }

    function handleDragEnd() {
        if (draggingSlide && dragOverSlide && draggingSlide !== dragOverSlide) {
            changeSlidePosition(editor, draggingSlide, dragOverSlide);
        }
        // Сброс состояний
        setDraggingSlide(null);
        setDragOverSlide(null);
    }

    return {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    };
}