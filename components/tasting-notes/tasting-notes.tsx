import {FC, useState} from "react";
import TextForm from "../text-form/text-form";
import {FormikHelpers} from "formik";
import tastingNotesTextCompletionRequest from "../../requests/tasting-notes-text-completion.request";
import TastingNoteItem from "../tasting-note-item/tasting-note-item";

const TastingNotes: FC = () => {
    const [results, setResults] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async ({text: prompt}: { text: string }, _: FormikHelpers<any>) => {
        setIsProcessing(true);
        setResults([]);
        try {
            const response = await tastingNotesTextCompletionRequest(prompt);
            setResults(response?.choices.map((choice: { text: string }) => {
                let completion = choice.text.trim();
                if (!/\p{P}$/u.test(completion)) {
                    completion += ' …'
                }
                if (/^[\p{L}\p{N}\p{Ps}\p{Pi}\p{Pd}]/u.test(completion)) {
                    completion = ' ' + completion
                }
                return `${prompt}${completion}`;
            }) || [])
        } catch (e) {
            // Todo: display error
            console.log(e);
        }
        setIsProcessing(false);

    }

    return (
        <div>
            <h2>Tasting Notes</h2>
            <TextForm
                handleSubmit={handleSubmit}
                isProcessing={isProcessing}
                buttonText={'Generate'}
                placeholder='Notes of blackberry, currant, and plum. There is a hint of oak on the finish…'
            />
            {results.length ? (
                <>
                    <h3>Suggestions</h3>
                    <ol>
                        {results.map((tastingNote, i) =>
                            <TastingNoteItem
                                key={`tn_${i}`}
                                tastingNote={tastingNote}
                                index={i}
                                depth={1}
                            />)}
                    </ol>
                </>
            ) : null}
        </div>
    )
}

export default TastingNotes;
