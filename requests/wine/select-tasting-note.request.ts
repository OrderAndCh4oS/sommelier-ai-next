import axios from 'axios';
import {ISelectTastingNote} from '../../interface/tasting-note.interface';

const selectTastingNoteRequest = async (selectTastingNote: ISelectTastingNote) => {
    // Todo: handle error responses
    const response = await axios.put('/api/wine/select-tasting-note', {selectTastingNote});

    return response.data;
}

export default selectTastingNoteRequest;
