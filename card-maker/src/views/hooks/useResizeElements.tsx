import React, { useState, useRef } from "react";
import { useAppActions } from './useAppActions';
import { useAppSelector } from './useAppSelector';

type UseResizeElementProps = {
    slideId: string;
}

export function useResizeElement({ slideId }: UseResizeElementProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [resizedElementId, setResizedElementId] = useState<string | null>(null);
    const startSize = useRef({ width: 0, height: 0 });
    const startMousePos = useRef({ x: 0, y: 0 });
    const initialPosition = useRef({ x: 0, y: 0 });
    const resizeDirect = useRef<string | null>(null);
    const editor = useAppSelector(state => state);
    const { resizeElementOnSlide } = useAppActions();

    // Используем временные переменные для хранения новых размеров и позиции
    const newSize = useRef({ width: 0, height: 0 });
    const newPos = useRef({ x: 0, y: 0 });

    function handleResizeMouseDown(event: React.MouseEvent, elementId: string, direction: string): void {
        event.preventDefault();
        setIsResizing(true);
        setResizedElementId(elementId);
        resizeDirect.current = direction;
        startMousePos.current = { x: event.clientX, y: event.clientY };

        const slide = editor.presentation.slides.find(s => s.id === slideId);
        const element = slide?.elements.find(e => e.id === elementId);
        if (element) {
            startSize.current = { width: element.size.width, height: element.size.height };
            initialPosition.current = { x: element.pos.x, y: element.pos.y };
            newSize.current = { width: startSize.current.width, height: startSize.current.height };
            newPos.current = { x: initialPosition.current.x, y: initialPosition.current.y };
        }
    }

    function handleResizeMouseMove(event: React.MouseEvent): void {
        if (!isResizing || !resizedElementId) {
            return;
        }

        const deltaX = event.clientX - startMousePos.current.x;
        const deltaY = event.clientY - startMousePos.current.y;

        switch (resizeDirect.current) {
            case 'top-left':
                newPos.current.x = initialPosition.current.x + deltaX;
                newPos.current.y = initialPosition.current.y + deltaY;
                newSize.current.width = Math.max(10, startSize.current.width - deltaX);
                newSize.current.height = Math.max(10, startSize.current.height - deltaY);
                break;
            case 'top-right':
                newPos.current.y = initialPosition.current.y + deltaY;
                newSize.current.width = Math.max(10, startSize.current.width + deltaX);
                newSize.current.height = Math.max(10, startSize.current.height - deltaY);
                break;
            case 'bottom-left':
                newPos.current.x = initialPosition.current.x + deltaX;
                newSize.current.width = Math.max(10, startSize.current.width - deltaX);
                newSize.current.height = Math.max(10, startSize.current.height + deltaY);
                break;
            case 'bottom-right':
                newSize.current.width = Math.max(10, startSize.current.width + deltaX);
                newSize.current.height = Math.max(10, startSize.current.height + deltaY);
                break;
            case 'middle-left':
                newPos.current.x = initialPosition.current.x + deltaX;
                newSize.current.width = Math.max(10, startSize.current.width - deltaX);
                break;
            case 'middle-right':
                newSize.current.width = Math.max(10, startSize.current.width + deltaX);
                break;
            case 'middle-top':
                newPos.current.y = initialPosition.current.y + deltaY;
                newSize.current.height = Math.max(10, startSize.current.height - deltaY);
                break;
            case 'middle-bottom':
                newSize.current.height = Math.max(10, startSize.current.height + deltaY);
                break;
        }

        // Проверка границ
        const slideWidth = 935;
        const slideHeight = 525;

        if (newPos.current.x < 0) {
            newSize.current.width += newPos.current.x;
            newPos.current.x = 0;
        }
        if (newPos.current.y < 0) {
            newSize.current.height += newPos.current.y;
            newPos.current.y = 0;
        }
        if (newPos.current.x + newSize.current.width > slideWidth) {
            newSize.current.width = slideWidth - newPos.current.x;
        }
        if (newPos.current.y + newSize.current.height > slideHeight) {
            newSize.current.height = slideHeight - newPos.current.y;
        }
    }

    function handleResizeMouseUp(): void {
        if (resizedElementId) {
            // Вызов функции изменения размера после завершения изменения
            resizeElementOnSlide(slideId, resizedElementId, newSize.current.width, newSize.current.height, newPos.current.x, newPos.current.y);
        }
        setIsResizing(false);
        setResizedElementId(null);
        resizeDirect.current = null;
    }

    return {
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp,
    };
}
