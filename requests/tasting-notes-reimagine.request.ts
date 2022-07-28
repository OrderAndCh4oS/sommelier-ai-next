import axios from "axios";


const tastingNotesTextCompletionRequest = async (tastingNotes: string) => {
    // Todo: handle error responses
    const response = await axios.post('/api/tasting-notes-reimagine', {tastingNotes});

    return response.data;
}

export default tastingNotesTextCompletionRequest;
