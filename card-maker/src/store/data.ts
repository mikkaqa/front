import {Presentation, SlideType} from "./PresentationTypes.ts";
import {EditorType} from "./editorType.ts";


const slide1: SlideType = {
    id: 'slide-1',
    elements: [
        {
            id: 'text-1',
            type: 'SlideText',
            pos: {x: 20, y: 170},
            size: {width: 400, height: 30},
            value: 'Подвыпившие Штирлиц и Мюллер вышли из бара.\n' +
                '— Давайте снимем девочек, — предложил Штирлиц.\n' +
                '— У вас очень доброе сердце, — ответил Мюллер. — Но пусть все-таки повисят до утра.',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'text-2',
            type: 'SlideText',
            pos: {x: 100, y: 10},
            size: {width: 400, height: 30},
            value: 'КоГда УжЕ хУки?',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'text-3',
            type: 'SlideText',
            pos: {x: 100, y: 50},
            size: {width: 400, height: 30},
            value: 'НЕееет хуки',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'image-1',
            type: 'SlideImage',
            pos: {x: 350, y: 300},
            size: {width: 200, height: 130},
            src: './src/store/img.png',
        },

    ],
    background: {type: 'solid', color: '#007799'},
}
const slide2: SlideType = {
    id: 'slide-2',
    elements: [
        {
            id: 'image-2',
            type: 'SlideImage',
            pos: {x: 420, y: 50},
            size: {width: 400, height: 200},
            src: './src/store/img.png',
        },
    ],
    background: {type: 'image', src: './src/store/img.png'},

}

const presentation: Presentation = {
    title: 'Презентация без регистрации и смс',
    slides: [
        slide1, slide2
    ]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: null,
        selectedObjectId: null,
    }
}

export {
    editor,
}