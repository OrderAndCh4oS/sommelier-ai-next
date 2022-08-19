import axios from 'axios';
import IWine from '../../interface/wine-list.interface';

const getWineListByUserRequest = async (userId: string): Promise<IWine[]> => {
    // Todo: handle error responses
    const response = await axios.get(`/api/wine-list/${userId}`);

    return response.data;
}

export default getWineListByUserRequest;
