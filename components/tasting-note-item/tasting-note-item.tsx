import {FC, useState} from 'react';
import SpinnerIcon from '../icons/spinner.icon';
import styles from './styles.module.css';
import IWine from '../../interface/wine-list.interface';
import addTastingNoteRequest from '../../requests/wine/add-tasting-note.request';
import tastingNotesTextCompletionRequest from "../../requests/tasting-notes-text-completion.request";
import {IChoice} from "../../interface/misc";

interface ITastingNoteItemProps {
    tastingNote: string
    wine: IWine | null
    depth: number,
}

const TastingNoteItem: FC<ITastingNoteItemProps> = ({tastingNote, wine, depth}) => {
    const [subTastingNotes, setSubTastingNotes] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleReimagine = async () => {
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
                for (const key of ['createdAt', 'updatedAt', 'sk', 'tastingNoteSk', 'tastingNote', 'tastingNotes', 'userId']) {
                    delete wineData[key];
                }
            }
            const response = await tastingNotesTextCompletionRequest(tastingNote, wineData);
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
            const response = await addTastingNoteRequest({
                wineSk: wine!.sk,
                text: tastingNote
            });
            setSubTastingNotes(response?.choices.map((choice: { text: string }) => choice.text) || [])
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsSaving(false);
    };

    return (
        <li>
            <div className={styles.listItem}>
                <p className={styles.tastingNoteText}>{tastingNote}</p>
                <div className={styles.buttonRow}>
                    {
                        depth < 3 ? (
                            <button onClick={handleReimagine}>
                                Reimagine {isProcessing ? <SpinnerIcon/> : null}
                            </button>
                        ) : null
                    }
                    {wine ? (
                        <button onClick={handleSave}>
                            Save {isSaving ? <SpinnerIcon/> : null}
                        </button>
                    ) : null}
                </div>

                {subTastingNotes.length ? (
                    <ol>
                        {subTastingNotes.map((stn, i) => <TastingNoteItem
                            key={`tn_${i}_${depth + 1}`}
                            tastingNote={stn}
                            wine={wine}
                            depth={depth + 1}
                        />)}
                    </ol>
                ) : null}
            </div>
        </li>
    )
}

export default TastingNoteItem
