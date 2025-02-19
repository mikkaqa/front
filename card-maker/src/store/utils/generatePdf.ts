import jsPDF from "jspdf";
import "../../assets/Roboto-Black-normal.ts";
import { SlideType, SlideElement } from "../PresentationTypes";

export const generatePDF = async (slides: SlideType[]): Promise<Blob> => {
    const pdf = new jsPDF("landscape", "px", [935, 525]);

    pdf.setFont("Arial", "normal");

    if (!slides || slides.length === 0) {
        throw new Error("Error: The presentation does not contain any slides.");
    }

    slides.forEach((slide, index) => {

        if (slide.background?.type === "solid") {
            pdf.setFillColor(slide.background.color);
            pdf.rect(0, 0, 935, 525, "F");
        } else if (slide.background?.type === "image") {
            const img = slide.background.src;
            pdf.addImage(img, "JPEG", 0, 0, 935, 525);
        } else {
            pdf.setFillColor("white");
            pdf.rect(0, 0, 935, 525, "F");
        }


        slide.elements.forEach((element) => {
            if (element.type === "SlideText") {
                addTextToPDF(pdf, element);
            } else if (element.type === "SlideImage") {
                addImageToPDF(pdf, element);
            }
        });


        if (index < slides.length - 1) {
            pdf.addPage();
        }
    });

    return pdf.output("blob");
};


function addTextToPDF(pdf: jsPDF, element: SlideElement) {
    if (element.type === "SlideText") {
        pdf.setFont("Arial", "normal");
        pdf.setFontSize(element.fontSize);
        pdf.setTextColor("black");

        const textX = element.pos.x;
        const textY = element.pos.y + element.fontSize;

        pdf.text(element.value, textX, textY, {
            maxWidth: element.size.width,
        });
    }
}


function addImageToPDF(pdf: jsPDF, element: SlideElement) {
    if (element.type === "SlideImage") {
        const img = element.src;
        pdf.addImage(img, "JPEG", element.pos.x, element.pos.y, element.size.width, element.size.height);
    }
}