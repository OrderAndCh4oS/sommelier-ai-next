import axios from "axios";

const getWineListByUserRequest = async (userId: string) => {
    // Todo: handle error responses
    const response = await axios.get(`/api/wine-list/${userId}`);

    return response.data;
}

export default getWineListByUserRequest;
