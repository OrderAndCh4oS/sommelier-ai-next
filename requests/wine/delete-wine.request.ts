import axios from 'axios';
import IWine from '../../interface/wine-list.interface';

const deleteWineRequest = async (userId: string, sk: string): Promise<IWine> => {
    // Todo: handle error responses
    const response = await axios.delete(`/api/wine/delete/${userId}/${sk}`);

    return response.data;
}

export default deleteWineRequest;
