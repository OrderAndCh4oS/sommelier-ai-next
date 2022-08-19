import axios from "axios";

const getWineRequest = async (userId: string, sk: string) => {
    // Todo: handle error responses
    const response = await axios.get(`/api/wine/get/${userId}/${sk}`);

    return response.data;
}

export default getWineRequest;
