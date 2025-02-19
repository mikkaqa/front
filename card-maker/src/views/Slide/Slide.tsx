import { SlideType } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties, MouseEvent } from "react";
import { useDragAndDropElement } from "../hooks/useDragAndDropElement.tsx";
import { useResizeElement } from "../hooks/useResizeElements.tsx";
import { useAppSelector } from "../hooks/useAppSelector";
import { SelectionType } from "../../store/editorType.ts";
import { useAppActions } from "../hooks/useAppActions";

const Slide_Width = 935;
const Slide_Height = 525;

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    className: string,
    selection?: SelectionType,
    showResizeHandles?: boolean;
}

function Slide({slide, scale = 1, className, showResizeHandles = true}: SlideProps) {
    const selection = useAppSelector((editor) => editor.selection);
    const { setSelection } = useAppActions();
    const {
        isDragging,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp
    } = useDragAndDropElement({slideId: slide?.id ?? ''});
    const {
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp
    } = useResizeElement({slideId: slide?.id ?? ''});

    if (slide == null) {
        return (<></>)
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background?.type === 'solid' ? slide.background.color : '#ffffff',
        backgroundImage: slide.background?.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,
        zIndex: 1,
    }

    const handleGlobalMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (isResizing) {
            handleResizeMouseMove(event);
        } else if (isDragging) {
            handleElementMouseMove(event);
        }
    };

    const handleGlobalMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        if (isResizing || isDragging) {
            handleElementMouseUp();
            handleResizeMouseUp();
        }

        if (!isResizing && !isDragging) {
            const target = event.target as HTMLElement;
            const elementId = target.getAttribute('data-element-id');
            const slideId = slide?.id ?? "";

            if (elementId) {
                setSelection({ selectedSlideId: slideId, selectedObjectId: elementId });
            } else {
                setSelection({ selectedSlideId: slideId, selectedObjectId: null });
            }
        }
    };


    return (
        <div
            style={slideStyles}
            className={`${styles.slide} ${className}`}
            onMouseMove={handleGlobalMouseMove}
            onMouseUp={handleGlobalMouseUp}
        >
            {slide.elements.map(SlideElement => {
                const isSelectedElement = SlideElement.id === selection?.selectedObjectId;

                return (
                    <div
                        key={SlideElement.id}
                        draggable
                        data-element-id={SlideElement.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelection({selectedSlideId: slide.id, selectedObjectId: SlideElement.id})
                        }}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                            handleElementMouseDown(event, SlideElement.id)
                        }}

                    >
                        {SlideElement.type === "SlideText" && (
                            <TextObject
                                textObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectedElement}
                            />
                        )}
                        {SlideElement.type === "SlideImage" && (
                            <ImageObject
                                imageObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectedElement}
                            />
                        )}
                        {isSelectedElement && showResizeHandles && (
                            <>
                                <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'top-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y - 3,
                                         left: SlideElement.pos.x - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'top-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y - 3,
                                         left: SlideElement.pos.x + SlideElement.size.width - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'bottom-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y + SlideElement.size.height - 3,
                                         left: SlideElement.pos.x - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'bottom-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y + SlideElement.size.height - 3,
                                         left: SlideElement.pos.x + SlideElement.size.width - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y + SlideElement.size.height / 2,
                                         left: SlideElement.pos.x - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y + SlideElement.size.height / 2,
                                         left: SlideElement.pos.x + SlideElement.size.width - 3
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleTop}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-top')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y - 3,
                                         left: SlideElement.pos.x + SlideElement.size.width / 2
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleBottom}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-bottom')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.y + SlideElement.size.height - 3,
                                         left: SlideElement.pos.x  + SlideElement.size.width / 2
                                     }}/>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export {
    Slide,
}