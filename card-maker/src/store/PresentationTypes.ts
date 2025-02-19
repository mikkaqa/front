export type Presentation = {
  title: string,
  slides: SlidesCollection,
}

export type SlidesCollection = Array<SlideType>;

export type SlideType = {
  id: string,
  elements: Array<SlideElement>,
  background: Background | undefined,
}

export type SlideElement = SlideText | SlideImage;

export type Background = SolidBackground | ImageBackground;

export type SlideObj = {
  id: string,
  pos: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number,
  }
}

export type SlideImage = SlideObj & {
  src: string,
  type: "SlideImage",
}

export type ImageBackground = {
  type: 'image',
  src: string;
}

export type SolidBackground = {
  type: 'solid',
  color: string;
}

export type SlideText = SlideObj & {
  value: string,
  type: "SlideText",
  fontFamily: string,
  fontSize: number,
  fontColor: string,
}