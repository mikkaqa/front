import { useState, useRef } from "react";
import { useAppActions } from './useAppActions';
import { useAppSelector } from './useAppSelector';

type UseDragAndDropElementProps = {
    slideId: string;
}

export function useDragAndDropElement({ slideId }: UseDragAndDropElementProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const newPosition = useRef({ x: 0, y: 0 }); // Хранение новой позиции во время перетаскивания
    const { changeElementPosition } = useAppActions();
    const editor = useAppSelector((state) => state);
    const elementRef = useRef<{ x: number; y: number } | null>(null);

    function handleElementMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElementId(elementId);

        dragStartPos.current = { x: event.clientX, y: event.clientY };

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        const element = slide?.elements.find((e) => e.id === elementId);
        if (element) {
            elementRef.current = { x: element.pos.x, y: element.pos.y };
            // Инициализируем новое положение относительно позиции элемента
            newPosition.current.x = element.pos.x;
            newPosition.current.y = element.pos.y;
        }
    }

    function handleElementMouseMove(event: React.MouseEvent): void {
        if (!isDragging || !draggedElementId) {
            return;
        }

        const deltaX = event.clientX - dragStartPos.current.x;
        const deltaY = event.clientY - dragStartPos.current.y;

        // Обновление временной позиции с учетом начального положения
        newPosition.current.x = Math.max(0, Math.min(
            (elementRef.current?.x || 0) + deltaX,
            935 - (editor.presentation.slides.find((s) => s.id === slideId)?.elements.find(el => el.id === draggedElementId)?.size.width || 0)
        ));
        newPosition.current.y = Math.max(0, Math.min(
            (elementRef.current?.y || 0) + deltaY,
            525 - (editor.presentation.slides.find((s) => s.id === slideId)?.elements.find(el => el.id === draggedElementId)?.size.height || 0)
        ));
    }

    function handleElementMouseUp(): void {
        if (isDragging && draggedElementId) {
            const slide = editor.presentation.slides.find((s) => s.id === slideId);
            if (slide) {
                changeElementPosition(slideId, draggedElementId, newPosition.current.x, newPosition.current.y);
            }
        }

        setIsDragging(false);
        setDraggedElementId(null);
        elementRef.current = null;
        newPosition.current = { x: 0, y: 0 }; // Сброс новой позиции
    }

    return {
        isDragging,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp,
    };
}
