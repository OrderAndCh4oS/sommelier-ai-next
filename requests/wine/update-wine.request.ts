import axios from "axios";
import IWine from "../../interface/wine-list.interface";

const updateWineRequest = async (wine: Omit<IWine, 'createdAt' | 'updatedAt'>) => {
    // Todo: handle error responses
    const response = await axios.put('/api/wine/update', {wine});

    return response.data;
}

export default updateWineRequest;
