import type {NextPage} from 'next'
import createWineRequest from '../requests/wine/create-wine.request';
import updateWineRequest from '../requests/wine/update-wine.request';
import getWineRequest from '../requests/wine/get-wine.request';
import getWineListByUserRequest from '../requests/wine/get-wine-list-by-user.request';

const ApiTest: NextPage = () => {
    const userId = 'xxxxx';
    const sk = 'a-red-wine+PGpkYPiSlLPULbp5RoSiP';

    const redWine = {
        country: 'France',
        detailPrompt: 'A fine wine with a bright future, drink after 2024',
        flavourProfile: ['Ash', 'Cherry', 'Oak'],
        name: 'A Red Wine',
        region: 'Bordeaux',
        score: 91,
        starterText: 'Wonderfully rounded red with huge amount of promise',
        style: 'red',
        tastingNote: 'Wonderfully rounded red with huge amount of promise etc. etc. etc.',
        userId,
        vineyard: 'Chateaux Blah',
        vintage: 2016
    };
    const createWine = async () => {
        await createWineRequest(redWine);
    };
    const updateWine = async () => {
        await updateWineRequest({
            ...redWine,
            vintage: 2018,
            sk,
        });
    };
    const getWine = async () => {
        await getWineRequest(userId, sk);
    }
    const getWineList = async () => {
        await getWineListByUserRequest(userId);
    }
    return (
        <>
            <button onClick={createWine}>Create Wine</button>
            <button onClick={updateWine}>Update Wine</button>
            <button onClick={getWine}>Get Wine</button>
            <button onClick={getWineList}>Get Wine List</button>
        </>
    )
}

export default ApiTest;
