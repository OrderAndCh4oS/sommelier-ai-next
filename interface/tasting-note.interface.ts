export default interface ITastingNote {
    id: string,
    text: string,
}

export type ICreateTastingNote = {
    wineSk: string,
    text: string
}

export interface ISelectTastingNote {
    wineSk: string,
    tastingNoteId: string
}
