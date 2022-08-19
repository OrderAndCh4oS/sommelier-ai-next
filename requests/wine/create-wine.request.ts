import axios from "axios";
import IWine from "../../interface/wine-list.interface";

const createWineRequest = async (wine: Omit<IWine, 'sk' | 'createdAt' | 'updatedAt'> ) => {
    // Todo: handle error responses
    const response = await axios.post('/api/wine/create', {wine});

    return response.data;
}

export default createWineRequest;
