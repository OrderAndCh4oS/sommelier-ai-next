import {FC, useState} from 'react';
import tastingNotesReimagineRequest from '../../requests/tasting-notes-reimagine.request';
import SpinnerIcon from '../icons/spinner.icon';
import styles from './style.module.css';

interface ITastingNoteItemProps {
    tastingNote: string
    index: number,
    depth: number
}

const TastingNoteItem: FC<ITastingNoteItemProps> = ({tastingNote, index, depth}) => {
    const [subTastingNotes, setSubTastingNotes] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleReimagine = async () => {
        if (depth === 3) {
            // Todo: implement error/message handler
            alert('Max depth reached')
            return
        }
        setIsProcessing(true);
        try {
            const response = await tastingNotesReimagineRequest(tastingNote);
            console.log('r', response);
            setSubTastingNotes(response?.choices.map((choice: { text: string }) => choice.text) || [])
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsProcessing(false);
    };

    return (
        <li>
            <div className={styles.listItem}>
                <p className={styles.tastingNoteText}>{tastingNote}</p>
                {
                    depth < 3 ? (
                        <button onClick={handleReimagine}>
                            Reimagine {isProcessing ? <SpinnerIcon/> : null}
                        </button>
                    ) : null
                }
                {subTastingNotes.length ? (
                    <ol>
                        {subTastingNotes.map((stn, i) => <TastingNoteItem
                            key={`tn_${i}_${depth + 1}`}
                            tastingNote={stn}
                            index={i}
                            depth={depth + 1}
                        />)}
                    </ol>
                ) : null}
            </div>
        </li>
    )
}

export default TastingNoteItem
