import {FC, useState} from 'react';
import TextForm from '../text-form/text-form';
import {FormikHelpers} from 'formik';
import tastingNotesTextCompletionRequest from '../../requests/tasting-notes-text-completion.request';
import TastingNoteItem from '../tasting-note-item/tasting-note-item';
import tastingNotesReimagineRequest from '../../requests/tasting-notes-reimagine.request';
import styles from './styles.module.css';
import IWine from '../../interface/wine-list.interface';
import StoredTastingNotes from '../stored-tasting-notes/stored-tasting-notes';
import ITastingNote from "../../interface/tasting-note.interface";

interface ITastingNotesProps {
    wine: IWine | null
}

interface IChoice {
    message: IMessage
    index: number
    finish_reason: string
}

interface IMessage {
    content: string
    role: string
}

const TastingNotes: FC<ITastingNotesProps> = ({wine}) => {
    const [results, setResults] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentTab, setCurrentTab] = useState<'generate' | 'reimagine' | 'notes'>('generate');

    const handleSubmitCompletion = async ({text}: { text: string }, _: FormikHelpers<any>) => {
        setIsProcessing(true);
        setResults([]);
        try {
            let wineData = null;
            if(wine) {
                wineData = {...wine};
                for(const key of ['createdAt', 'updatedAt', 'sk', 'tastingNoteSk', 'tastingNote', 'tastingNotes', 'userId']) {
                    delete wineData[key];
                }
            }
            const response = await tastingNotesTextCompletionRequest(text, wineData);
            console.log('RESPONSE', response);
            setResults(response?.choices.map((choice: IChoice) => choice.message.content.trim()) || [])
        } catch (e) {
            // Todo: display error
            console.log(e);
        }
        setIsProcessing(false);
    }

    const handleSubmitReimagine = async ({text: tastingNote}: { text: string }, _: FormikHelpers<any>) => {
        setIsProcessing(true);
        setResults([]);
        try {
            const response = await tastingNotesReimagineRequest(tastingNote, wine);
            setResults(response?.choices.map((choice: { text: string }) => choice.text) || [])
        } catch (e) {
            // Todo: handle error
            console.log(e)
        }
        setIsProcessing(false);
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
                <button
                    className={[styles.tabButton, currentTab === 'reimagine' ? styles.active : ''].join(' ')}
                    onClick={handleTabChange('reimagine')}
                >Reimagine
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
                {currentTab === 'reimagine' ? <TextForm
                    handleSubmit={handleSubmitReimagine}
                    isProcessing={isProcessing}
                    buttonText={'Reimagine'}
                    placeholder="Scintillating citrus abounds in this fragrant ersatz dry riesling. Fantasy fruit trumps reality in this wacky creature that turns green apples into gold, peaches and apricots into fairy tales."
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
