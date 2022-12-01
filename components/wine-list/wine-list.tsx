import IWine from '../../interface/tastingNote-list.interface';
import {FC, useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineListByUserRequest from '../../requests/tastingNote/get-tastingNote-list-by-user.request';
import Link from 'next/link';
import deleteWineRequest from '../../requests/tastingNote/delete-tastingNote.request';
import SpinnerIcon from '../icons/spinner.icon';

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
    const [wineList, setWineList] = useState<IWine[]>([]);
    const {user} = useUser();

    useEffect(() => {
        if (!user?.sub) return
        (async () => {
            const newWineList = await getWineListByUserRequest(user.sub as string);
            setWineList(newWineList)
        })()
    }, [user]);

    const handleRemoveWine = (userId: string, sk: string) => {
        setWineList(prevState => prevState.filter(w => w.sk !== sk && w.userId !== userId))
    };

    return (
        <>
            <Link href="/tastingNote/create">
                <button>Create Wine</button>
            </Link>
            <h2>Wine List</h2>
            {wineList.map(tastingNote => (
                <div key={tastingNote.sk}>
                    <h3>{tastingNote.name}</h3>
                    <p>{tastingNote.country}, {tastingNote.region}, {tastingNote.vineyard}, {tastingNote.vintage}</p>
                    <p>{tastingNote.score}</p>
                    <p>{tastingNote.tastingNote}</p>
                    <Link
                        href={{
                            pathname: '/tastingNote/tasting-notes/[sk]',
                            query: {sk: tastingNote.sk},
                        }}
                    >
                        <button className="button">Tasting Notes</button>
                    </Link>
                    <Link
                        href={{
                            pathname: '/tastingNote/edit/[sk]',
                            query: {sk: tastingNote.sk},
                        }}
                    >
                        <button className="button">Edit</button>
                    </Link>
                    <DeleteWineButton tastingNote={tastingNote} handleRemoveWine={handleRemoveWine}/>
                </div>
            ))}
        </>
    );
};

export default WineList;
