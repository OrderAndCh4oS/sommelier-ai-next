import {FC, useEffect, useState} from 'react';
import IWine from '../../interface/wine-list.interface';
import {useUser} from '@auth0/nextjs-auth0';
import getWineRequest from '../../requests/wine/get-wine.request';
import styles from './styles.module.css';
import SpinnerIcon from '../icons/spinner.icon';
import selectTastingNoteRequest from '../../requests/wine/select-tasting-note.request';

const StoredTastingNotes: FC<{ wineSk: string }> = ({wineSk}) => {
    const [wine, setWine] = useState<IWine | null>(null);
    const {user} = useUser();
    const [isSelecting, setIsSelecting] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);

    const handleSelect = (tastingNoteSk: string) => async () => {
        setIsSelecting(true);
        try {
            await selectTastingNoteRequest({
                userId: user!.sub!,
                wineSk: wine!.sk,
                tastingNoteSk
            });
            const newWine = await getWineRequest(user!.sub!, wineSk);
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
            const newWine = await getWineRequest(user.sub!, wineSk);
            setWine(newWine)
        })()
    }, [user]);

    if (!wine) return <p className={styles.loading}>Loading…</p>

    return (
        <div>
            <h3>{wine.name}</h3>
            <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
            <p>Score: {wine.score}</p>
            {hasSaved && <p className={styles.selected}>Saved Selection</p>}
            <h4>Stored Notes</h4>
            <ol>
                {wine.tastingNotes?.map(tastingNote => (
                    <li>
                        <div className={styles.listItem}>
                            {tastingNote.sk === wine.tastingNoteSk && <p>Selected</p>}
                            <p className={styles.tastingNoteText}>{tastingNote.text}</p>
                            <button onClick={handleSelect(tastingNote.sk)}>
                                Save {isSelecting ? <SpinnerIcon/> : null}
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default StoredTastingNotes;
