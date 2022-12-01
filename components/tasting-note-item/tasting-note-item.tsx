import {FC, useState} from 'react';
import tastingNotesReimagineRequest from '../../requests/tasting-notes-reimagine.request';
import SpinnerIcon from '../icons/spinner.icon';
import styles from './styles.module.css';
import IWine from '../../interface/wine-list.interface';
import addTastingNoteRequest from '../../requests/wine/add-tasting-note.request';
import {useUser} from '@auth0/nextjs-auth0';

interface ITastingNoteItemProps {
    tastingNote: string
    wine: IWine | null
    depth: number,
}

const TastingNoteItem: FC<ITastingNoteItemProps> = ({tastingNote, wine, depth}) => {
    const [subTastingNotes, setSubTastingNotes] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {user} = useUser();

    const handleReimagine = async () => {
        if (depth === 3) {
            // Todo: implement error/message handler
            alert('Max depth reached')
            return
        }
        setIsProcessing(true);
        try {
            const response = await tastingNotesReimagineRequest(tastingNote, wine);
            setSubTastingNotes(response?.choices.map((choice: { text: string }) => choice.text) || [])
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
                userId: user!.sub!,
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
                    <button onClick={handleSave}>
                        Save {isSaving ? <SpinnerIcon/> : null}
                    </button>
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
