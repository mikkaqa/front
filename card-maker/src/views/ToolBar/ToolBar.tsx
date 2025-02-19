import styles from './ToolBar.module.css';
import { useAppActions } from '../hooks/useAppActions.ts';
import { importPresentation, exportPresentation } from '../../store/localStorage/fileUtils';
import React, { useRef, useState, useEffect} from 'react';
import { HistoryContext } from '../hooks/historyContenx.ts';
import { useAppSelector } from "../hooks/useAppSelector";
import { generatePDF } from "../../store/utils/generatePdf.ts";

export function ToolBar() {

    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // State for color picker
    const [pdfURL, setPdfURL] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const {addSlide} = useAppActions()
    const {removeSlide} = useAppActions()
    const {addTextToSlide} = useAppActions()
    const {addImageToSlide} = useAppActions()
    const {removeSlideElement} = useAppActions()
    const {changeSlideBackground} = useAppActions()
    const {changeSlideBgrImage} = useAppActions()
    const {setEditor} = useAppActions()
    const history = React.useContext(HistoryContext)
    const editor = useAppSelector((state) => state);
    const slides = editor.presentation.slides;

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey) {
                if (event.key === 'z' || event.key === 'Z'|| event.key === 'я' || event.key === 'Я') {
                    event.preventDefault();
                    onUndo();
                } else if (event.key === 'y' || event.key === 'Y' || event.key === 'н'|| event.key === 'Н') {
                    event.preventDefault();
                    onRedo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgSrc = reader.result as string;

                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    // Теперь мы можем получить размеры
                    const width = img.width;
                    const height = img.height;

                    addImageToSlide(imgSrc, width, height);
                };
            }
            reader.readAsDataURL(file);
        }

    }

    const OnChangeSlideBgrImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                changeSlideBgrImage({type: 'image', src: reader.result as string});
            };
            reader.readAsDataURL(file);
        }
    };

    const OnSlideBackgroundChange = (color: string) => {
        changeSlideBackground({type: 'solid', color});
        setBackgroundColor(color); // Update color picker state
    };

    /*function onExportPresentation() {
        const editor = getEditor();
        exportPresentation(editor);
    }*/

    function onImportPresentation(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file) {
            importPresentation(file)
                .then((importedEditor) => {
                    setEditor(importedEditor);
                })
                .catch((err) => {
                    console.error("Error importing presentation:", err);
                    alert("Ошибка при импорте презентации. Проверьте формат файла.");
                });
        }
    }
    const presentationTitle = editor.presentation.title;

    const handleGeneratePDF = async () => {
        try {
            const pdfBlob = await generatePDF(slides);
            const pdfURL = URL.createObjectURL(pdfBlob);
            setPdfURL(pdfURL);
            setModalOpen(true);
        } catch (error) {
            console.error("Ошибка при генерации PDF:", error);
            alert("Ошибка при генерации PDF. Проверьте консоль для деталей.");
        }

    };

    const handleDownloadPDF = () => {
        if (pdfURL) {
            const link = document.createElement("a");
            link.href = pdfURL;
            link.download = presentationTitle + ".pdf";
            link.click();
        }
    };

    const handleClosePreview = () => {
        setModalOpen(false);
        setPdfURL(null);
    };


    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const bgrImageInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                Добавить Слайд
            </button>

            <button className={styles.button} onClick={removeSlide}>
                Удалить Слайд
            </button>

            <button className={styles.button} onClick={onUndo}>
                Undo
            </button>

            <button className={styles.button} onClick={onRedo}>
                Redo
            </button>

            <button className={styles.button} onClick={addTextToSlide}>
                Добавить текст
            </button>

            <button className={styles.button}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={handleImageChange}
                    className={styles.imageUploader}
                    style={{display: 'none'}}
                    ref={imageInputRef}
                />
                <span onClick={() => imageInputRef.current?.click()}>Добавить картинку</span>
            </button>

            <button className={styles.button} onClick={removeSlideElement}>
                Удалить Объект
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button}>
                    Поменять Фон
                    <input
                        className={styles.colorpicker}
                        type={'color'}
                        value={backgroundColor}
                        onInput={() => {
                        }}
                        onChange={(e) => OnSlideBackgroundChange(e.target.value)}></input>
                </button>
            </div>

            <button className={styles.button} onClick={() => bgrImageInputRef.current?.click()}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={OnChangeSlideBgrImage}
                    className={styles.imageUploader}
                    style={{display: 'none'}}
                    ref={bgrImageInputRef}
                />
                Фон слайда
            </button>

            <button className={styles.button} onClick={exportPresentation}>
                Экспорт
            </button>

            <div className={styles.importButton}>

                <button
                    className={styles.button}
                    onClick={() => document.getElementById('importFile')?.click()}>
                    Импорт
                </button>

                <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={onImportPresentation}
                    className={styles.fileInput}
                    style={{display: 'none'}}/>
            </div>

            <button className={styles.button} onClick={handleGeneratePDF}>
                Сгенерировать PDF
            </button>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        {pdfURL && (
                            <>
                                <iframe
                                    src={pdfURL}
                                    title="PDF Preview"
                                    className={styles.iframePreview}
                                    style={{width: '100%', height: '80vh'}} // Устанавливаем размеры iframe
                                ></iframe>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <button className={styles.button} onClick={handleDownloadPDF}>
                                        Скачать PDF
                                    </button>
                                    <button className={styles.Button} onClick={handleClosePreview}>
                                        Отмена
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}