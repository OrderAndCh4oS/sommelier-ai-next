import {FC, useEffect, useState} from 'react';
import IWine from '../../interface/wine-list.interface';
import {useUser} from '@auth0/nextjs-auth0';
import getWineRequest from '../../requests/wine/get-wine.request';
import styles from './styles.module.css';
import SpinnerIcon from '../icons/spinner.icon';
import selectTastingNoteRequest from '../../requests/wine/select-tasting-note.request';

const StoredTastingNotes: FC<{ wineSk: string }> = ({wineSk}) => {
    const {user} = useUser();
    const [wine, setWine] = useState<IWine | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);

    const handleSelect = (tastingNoteSk: string) => async () => {
        setIsSelecting(true);
        try {
            await selectTastingNoteRequest({
                wineSk: wine!.sk,
                tastingNoteSk
            });
            const newWine = await getWineRequest(wineSk);
            setWine(newWine)
            setHasSaved(true);
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsSelecting(false);
    };

    useEffect(() => {
        if (!user?.sub) return
        (async () => {
            const newWine = await getWineRequest(wineSk);
            setWine(newWine)
        })()
    }, [user, wineSk]);

    if (!wine) return <p className={styles.loading}>Loading…</p>

    return (
        <div>
            <h3>{wine.name}</h3>
            <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
            <p>Score: {wine.score}</p>
            {hasSaved && <p className={styles.saved}>Saved Selection</p>}
            <h4>Stored Notes</h4>
            <ol>
                {wine.tastingNotes?.map(tastingNote => (
                    <li key={tastingNote.sk}>
                        <div
                            className={`${styles.listItem} ${tastingNote.sk === wine.tastingNoteSk ? styles.selected : ''}`}>
                            {tastingNote.sk === wine.tastingNoteSk && <p className={styles.selectedText}>Selected</p>}
                            <p className={styles.tastingNoteText}>{tastingNote.text}</p>
                            <button onClick={handleSelect(tastingNote.sk)}>
                                Select {isSelecting ? <SpinnerIcon/> : null}
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default StoredTastingNotes;
