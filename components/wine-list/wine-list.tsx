import {FC, useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import Link from 'next/link';
import SpinnerIcon from '../icons/spinner.icon';
import deleteWineRequest from '../../requests/wine/delete-wine.request';
import getWineListByUserRequest from '../../requests/wine/get-wine-list-by-user.request';
import IWine from '../../interface/wine-list.interface';
import styles from './styles.module.css';

interface IDeleteWineButtonProps {
    tastingNote: IWine,
    handleRemoveWine: (userId: string, sk: string) => void
}

const DeleteWineButton: FC<IDeleteWineButtonProps> = ({tastingNote, handleRemoveWine}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const {user} = useUser();

    const handleDelete = (sk: string) => async () => {
        if (!user?.sub) return
        setIsProcessing(true)
        try {
            await deleteWineRequest(user.sub as string, sk)
            handleRemoveWine(user.sub as string, sk);
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsProcessing(false)
    };

    return (
        <button onClick={handleDelete(tastingNote.sk)}>
            Delete {isProcessing ? <SpinnerIcon/> : null}
        </button>
    );
};

const WineList: FC = () => {
    const [wineList, setWineList] = useState<IWine[] | null>(null);
    const {user} = useUser();

    useEffect(() => {
        if (!user?.sub) return
        (async () => {
            const newWineList = await getWineListByUserRequest(user.sub as string);
            setWineList(newWineList.map(wine => {
                if (!wine.tastingNoteId) return wine;
                const selectedTastingNote = wine.tastingNotes?.find(tn => tn.id === wine.tastingNoteId);
                if (selectedTastingNote) wine.tastingNote = selectedTastingNote.text;
                return wine;
            }))
        })()
    }, [user]);

    const handleRemoveWine = (userId: string, sk: string) => {
        setWineList(prevState => prevState?.filter(w => w.sk !== sk) ?? null)
    };

    return (
        <>
            <Link href="/wine/create">
                <a className={styles.buttonLink}>
                    <button>Add Wine</button>
                </a>
            </Link>
            <h2>Wine List</h2>
            {!wineList && <p className={styles.loading}>Loading…</p>}
            {wineList && !wineList.length ? <p className={styles.loading}>No wines found</p> : null}
            {wineList?.map(wine => (
                <div key={wine.sk}>
                    <h3>{wine.name}</h3>
                    <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
                    <p>Score: {wine.score}</p>
                    {wine.tastingNote
                        ? (
                            <>
                                <h4>Tasting Notes</h4>
                                <p>{wine.tastingNote}</p>
                            </>
                        ) : null
                    }
                    <div className={styles.buttonRow}>
                        <Link
                            href={{
                                pathname: '/wine/tasting-notes/[sk]',
                                query: {sk: wine.sk},
                            }}
                        >
                            <a className={styles.buttonLink}>
                                <button className="button">Tasting Notes</button>
                            </a>
                        </Link>
                        <Link
                            href={{
                                pathname: '/wine/edit/[sk]',
                                query: {sk: wine.sk},
                            }}
                        >
                            <a className={styles.buttonLink}>
                                <button className="button">Edit</button>
                            </a>
                        </Link>
                        <DeleteWineButton tastingNote={wine} handleRemoveWine={handleRemoveWine}/>
                    </div>
                </div>
            ))}
        </>
    );
};

export default WineList;
