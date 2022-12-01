import axios from 'axios';
import {IUpdateWine} from '../../interface/wine-list.interface';
import {ISelectTastingNote} from '../../interface/tasting-note.interface';

const selectTastingNoteRequest = async (selectTastingNote: ISelectTastingNote) => {
    // Todo: handle error responses
    const response = await axios.put('/api/wine/select-tasting-note', {selectTastingNote});

    return response.data;
}

export default selectTastingNoteRequest;
