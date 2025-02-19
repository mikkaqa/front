import { uuidV4 } from "../utils/uuidV4";
import { SlideType  } from "./../PresentationTypes";

function createNewSlide(): SlideType {
    return {
        id: uuidV4(),
        elements: [],
        background: {
            type: 'solid',
            color: '#ffffff',
        }
    };
}
export {
    createNewSlide,
}