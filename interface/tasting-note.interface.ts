export default interface ITastingNote {
    id: string,
    text: string,
}

export type ICreateTastingNote = Omit<ITastingNote, 'sk' | 'createdAt' | 'updatedAt'>;

export interface ISelectTastingNote {
    wineSk: string,
    tastingNoteId: string
}
