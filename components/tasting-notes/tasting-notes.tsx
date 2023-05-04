import {FC, useState} from 'react';
import TextForm from '../text-form/text-form';
import {FormikHelpers} from 'formik';
import tastingNotesTextCompletionRequest from '../../requests/tasting-notes-text-completion.request';
import TastingNoteItem from '../tasting-note-item/tasting-note-item';
import styles from './styles.module.css';
import StoredTastingNotes from '../stored-tasting-notes/stored-tasting-notes';
import {IChoice, ITastingNotesProps} from "../../interface/misc";

const TastingNotes: FC<ITastingNotesProps> = ({wine}) => {
    const [results, setResults] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentTab, setCurrentTab] = useState<'generate' | 'reimagine' | 'notes'>('generate');

    const handleSubmitCompletion = async ({text}: { text: string }, _: FormikHelpers<any>) => {
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
                    handleSubmit={handleSubmitCompletion}
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
                                />)}
                        </ol>
                    </>
                ) : null}
            </>
        </div>
    )
}

export default TastingNotes;
