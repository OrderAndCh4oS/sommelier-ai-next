import axios from "axios";


const tastingNotesTextCompletionRequest = async (prompt: string) => {
    const response = await axios.post('/api/tasting-notes-text-completion', {prompt});

    return response.data;
}

export default tastingNotesTextCompletionRequest;
