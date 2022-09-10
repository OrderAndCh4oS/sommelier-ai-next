import IWine from '../../interface/wine-list.interface';
import {FC, useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineListByUserRequest from '../../requests/wine/get-wine-list-by-user.request';
import Link from 'next/link';
import deleteWineRequest from '../../requests/wine/delete-wine.request';
import SpinnerIcon from '../icons/spinner.icon';

interface IDeleteWineButtonProps {
    wine: IWine,
    handleRemoveWine: (userId: string, sk: string) => void
}

const DeleteWineButton: FC<IDeleteWineButtonProps> = ({wine, handleRemoveWine}) => {
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
        <button onClick={handleDelete(wine.sk)}>
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
            <Link href="/wine/create">
                <button>Create Wine</button>
            </Link>
            <h2>Wine List</h2>
            {wineList.map(wine => (
                <div key={wine.sk}>
                    <h3>{wine.name}</h3>
                    <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
                    <p>{wine.score}</p>
                    <p>{wine.tastingNote}</p>
                    <Link
                        href={{
                            pathname: '/wine/tasting-notes/[sk]',
                            query: {sk: wine.sk},
                        }}
                    >
                        <button className="button">Tasting Notes</button>
                    </Link>
                    <Link
                        href={{
                            pathname: '/wine/edit/[sk]',
                            query: {sk: wine.sk},
                        }}
                    >
                        <button className="button">Edit</button>
                    </Link>
                    <DeleteWineButton wine={wine} handleRemoveWine={handleRemoveWine}/>
                </div>
            ))}
        </>
    );
};

export default WineList;
