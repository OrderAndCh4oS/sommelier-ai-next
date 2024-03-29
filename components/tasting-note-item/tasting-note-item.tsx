import {createRef, FC, useState} from 'react';
import SpinnerIcon from '../icons/spinner.icon';
import styles from './styles.module.css';
import IWine from '../../interface/wine-list.interface';
import addTastingNoteRequest from '../../requests/wine/add-tasting-note.request';
import tastingNotesTextCompletionRequest from "../../requests/tasting-notes-text-completion.request";
import {IChoice} from "../../interface/misc";
import AutoExpandTextArea from "../form-elements/auto-expand-text-area";

interface ITastingNoteItemProps {
    tastingNote: string
    wine: IWine | null
    depth: number
    handlePromote: (text: string) => void
    handleRemove: () => void
}

const TastingNoteItem: FC<ITastingNoteItemProps> = ({tastingNote, wine, depth, handleRemove, handlePromote}) => {
    const [subTastingNotes, setSubTastingNotes] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const ref = createRef<HTMLDivElement>()

    const promote = () => {
        if (!ref.current) return;
        handlePromote(ref.current.innerText);
    }

    const handleSubRemove = (index: number) => () => {
        setSubTastingNotes(prevState => prevState.filter((_, i) => i !== index))
    }

    const handleReimagine = async () => {
        if (!ref.current?.innerText) return // Todo: display an error if there's no text
        if (depth === 3) {
            // Todo: implement error/message handler
            alert('Max depth reached')
            return
        }
        setIsProcessing(true);
        try {
            let wineData = null;
            if (wine) {
                wineData = {...wine};
                for (const key of ['createdAt', 'updatedAt', 'sk', 'tastingNoteId', 'tastingNote', 'tastingNotes', 'userId']) {
                    delete wineData[key];
                }
            }
            const response = await tastingNotesTextCompletionRequest(ref.current.innerText, wineData);
            setSubTastingNotes(response?.choices.map((choice: IChoice) => choice.message.content.trim()) || [])
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsProcessing(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (!ref.current?.innerText) return // Todo: display an error if there's no text
            await addTastingNoteRequest({
                wineSk: wine!.sk,
                text: ref.current?.innerText
            });
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsSaving(false);
    };

    return (
        <li>
            <div className={styles.listItem}>
                <AutoExpandTextArea ref={ref}>{tastingNote}</AutoExpandTextArea>
                <div className={styles.buttonRow}>
                    {wine ? (
                        <button onClick={handleSave}>
                            Save {isSaving ? <SpinnerIcon/> : null}
                        </button>
                    ) : null}
                    <button onClick={promote}>
                        Pick
                    </button>
                    {
                        depth < 3 ? (
                            <button onClick={handleReimagine}>
                                More Like This {isProcessing ? <SpinnerIcon/> : null}
                            </button>
                        ) : null
                    }
                    <button className={styles.removeButton} onClick={handleRemove}>
                        Remove
                    </button>
                </div>

                {subTastingNotes.length ? (
                    <ol>
                        {subTastingNotes.map((stn, i) => <TastingNoteItem
                            key={`tn_${i}_${depth + 1}`}
                            tastingNote={stn}
                            wine={wine}
                            depth={depth + 1}
                            handleRemove={handleSubRemove(i)}
                            handlePromote={handlePromote}
                        />)}
                    </ol>
                ) : null}
            </div>
        </li>
    )
}

export default TastingNoteItem
