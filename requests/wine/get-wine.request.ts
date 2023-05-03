import axios from 'axios';
import IWine from '../../interface/wine-list.interface';

const getWineRequest = async (sk: string): Promise<IWine> => {
    // Todo: handle error responses
    const response = await axios.get(`/api/wine/get/${encodeURIComponent(sk)}`);

    return response.data;
}

export default getWineRequest;
