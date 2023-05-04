import {createRef, FC, useRef, useState, MouseEvent} from 'react';
import TextForm, {TastingNotesFormData} from '../text-form/text-form';
import tastingNotesTextCompletionRequest from '../../requests/tasting-notes-text-completion.request';
import TastingNoteItem from '../tasting-note-item/tasting-note-item';
import styles from './styles.module.css';
import StoredTastingNotes from '../stored-tasting-notes/stored-tasting-notes';
import {IChoice, ITastingNotesProps} from "../../interface/misc";
import addTastingNoteRequest from "../../requests/wine/add-tasting-note.request";

const TastingNotes: FC<ITastingNotesProps> = ({wine}) => {
    const [results, setResults] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentTab, setCurrentTab] = useState<'generate' | 'reimagine' | 'notes'>('generate');
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const handleRemove = (index: number) => () => {
        setResults(prevState => prevState.filter((_, i) => i !== index))
    }

    const handlePromote = (text: string) => {
        if (!ref.current) return;
        ref.current.value = text;
        setResults([]);
    }

    const handleSubmitCompletion = async ({text}: TastingNotesFormData) => {
        setIsProcessing(true);
        setResults([]);
        try {
            let wineData = null;
            if (wine) {
                wineData = {...wine};
                for (const key of ['createdAt', 'updatedAt', 'sk', 'tastingNoteSk', 'tastingNote', 'tastingNotes', 'userId']) {
                    delete wineData[key];
                }
            }
            const response = await tastingNotesTextCompletionRequest(text, wineData);
            setResults(response?.choices.map((choice: IChoice) => choice.message.content.trim()) || [])
        } catch (e) {
            // Todo: display error
            console.log(e);
        }
        setIsProcessing(false);
    }

    const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!ref.current?.value || !wine) return // Todo: display an error if there's no text
        setIsSaving(true);
        try {
            await addTastingNoteRequest({
                wineSk: wine.sk,
                text: ref.current.value
            });
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsSaving(false);
    };

    const handleTabChange = (tab: 'generate' | 'reimagine' | 'notes') => () => setCurrentTab(tab);

    return (
        <div>
            <h2>Tasting Notes</h2>
            <div className={styles.tabBar}>
                <button
                    className={[styles.tabButton, currentTab === 'generate' ? styles.active : ''].join(' ')}
                    onClick={handleTabChange('generate')}
                >Generate
                </button>
                {wine ? (
                    <button
                        className={[styles.tabButton, currentTab === 'notes' ? styles.active : ''].join(' ')}
                        onClick={handleTabChange('notes')}
                    >Stored Notes</button>
                ) : null}
            </div>
            <>
                {currentTab === 'generate' ? <TextForm
                    ref={ref}
                    onSubmit={handleSubmitCompletion}
                    handleSave={wine ? handleSave : undefined}
                    isSaving={isSaving}
                    isProcessing={isProcessing}
                    buttonText={'Generate'}
                    placeholder="Notes of blackberry, currant, and plum. There is a hint of oak on the finish…"
                /> : null}
                {currentTab === 'notes' && wine ? <StoredTastingNotes wineSk={wine.sk}/> : null}
                {currentTab !== 'notes' && results.length ? (
                    <>
                        <h3>Suggestions</h3>
                        <ol>
                            {results.map((tastingNote, i) =>
                                <TastingNoteItem
                                    key={`tn_${i}`}
                                    tastingNote={tastingNote}
                                    wine={wine}
                                    depth={1}
                                    handlePromote={handlePromote}
                                    handleRemove={handleRemove(i)}
                                />)}
                        </ol>
                    </>
                ) : null}
            </>
        </div>
    )
}

export default TastingNotes;
