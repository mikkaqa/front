import { Slide } from "../Slide/Slide.tsx";
import styles from './SlideList.module.css';
import { useDragAndDropSlide } from "../hooks/useDragAndDropSlide.tsx";
import { useAppActions } from "../hooks/useAppActions.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const Slide_Preview_Scale = 0.2;


function SlidesList() {

    function getSlideWrapperClassName(slideId: string, selectedSlideId: string | undefined | null): string {
        let className = styles.slideWrapper;
        if (slideId === selectedSlideId) {
            className = `${className} ${styles.selectedSlide}`;
        }
        return className;
    }


    const editor = useAppSelector((editor) => editor);
    const slides = editor.presentation.slides;
    const selection = editor.selection;
    const { setSelection } = useAppActions();

    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useDragAndDropSlide();


    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            selectedObjectId: null,
        });
    }

    return (
        <div className={styles.slideList}>
            {slides.map(slide =>
                <div key={slide.id}
                     draggable
                     onDragStart={() => handleDragStart(slide.id)}
                     onDragOver={(e) => handleDragOver(e, slide.id)}
                     onDragEnd={handleDragEnd}
                     onClick={() => onSlideClick(slide.id)}
                     className={`${styles.slideWrapper} ${draggingSlide === slide.id ? styles.dragging : ''} ${dragOverSlide === slide.id ? styles.dragover : ''} ${getSlideWrapperClassName(slide.id, selection?.selectedSlideId)}`}>

                    <Slide
                        slide={slide}
                        scale={Slide_Preview_Scale}
                        className={styles.item}
                        showResizeHandles={false}
                    />
                </div>
            )}
        </div>
    );
}

export {
    SlidesList,
}