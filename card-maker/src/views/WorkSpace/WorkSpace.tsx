import { SlideType } from "../../store/PresentationTypes.ts";
import { Slide } from "../Slide/Slide.tsx";
import styles from './WorkSpace.module.css'
import { useAppSelector } from "../hooks/useAppSelector.ts";

function Workspace() {

    const editor = useAppSelector((editor=> editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: SlideType = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]


    return (
        <div className={styles.workspace}>
            <Slide slide={selectedSlide}  className={styles.workspace} ></Slide>
        </div>
    )
}
export {
    Workspace,
}
