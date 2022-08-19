import axios from 'axios';
import {IUpdateWine} from '../../interface/wine-list.interface';

const updateWineRequest = async (wine: IUpdateWine) => {
    // Todo: handle error responses
    const response = await axios.put('/api/wine/update', {wine});

    return response.data;
}

export default updateWineRequest;
