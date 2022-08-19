import axios from 'axios';
import {ICreateWine} from '../../interface/wine-list.interface';

const createWineRequest = async (wine: ICreateWine) => {
    // Todo: handle error responses
    const response = await axios.post('/api/wine/create', {wine});

    return response.data;
}

export default createWineRequest;
