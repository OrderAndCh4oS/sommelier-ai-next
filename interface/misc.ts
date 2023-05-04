import IWine from "./wine-list.interface";

export interface ITastingNotesProps {
    wine: IWine | null
}

export interface IChoice {
    message: IMessage
    index: number
    finish_reason: string
}

export interface IMessage {
    content: string
    role: string
}
