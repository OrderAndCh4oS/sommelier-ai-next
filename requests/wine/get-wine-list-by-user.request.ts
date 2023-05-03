import axios from 'axios';
import IWine from '../../interface/wine-list.interface';

const getWineListByUserRequest = async (userId: string): Promise<IWine[]> => {
    try {
        const response = await axios.get(`/api/wine-list`);

        return response.data;
    } catch(e) {
        console.error(e); // Todo: handle errors
        return []
    }
}

export default getWineListByUserRequest;
