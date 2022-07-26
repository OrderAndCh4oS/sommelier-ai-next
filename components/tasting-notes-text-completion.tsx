import {FC, useState} from "react";
import TextForm from "./text-form/text-form";
import {FormikHelpers} from "formik";
import tastingNotesTextCompletionRequest from "../requests/tasting-notes-text-completion.request";

const TastingNotesTextCompletion: FC = () => {
    const [results, setResults] = useState<string[]>([]);

    const handleSubmit = async ({text: prompt}: { text: string }, _: FormikHelpers<any>) => {
        const response = await tastingNotesTextCompletionRequest(prompt);
        setResults(response?.choices.map((choice: { text: string }) => {
            let completion = choice.text.trim();
            console.log(completion);
            if (!/\p{P}$/u.test(completion)) {
                completion += ' …'
            }
            if(/^[\p{L}\p{N}\p{Ps}\p{Pi}\p{Pd}]/u.test(completion)) {
                completion = ' ' + completion
            }
            return `${prompt}${completion}`;
        }))
    }

    return (
        <div>
            <h2>Tasting Notes</h2>
            <TextForm handleSubmit={handleSubmit} buttonText={'Generate'}/>
            {results.length ? (
                <>
                    <h3>Suggestions</h3>
                    <ol>
                        {results.map((text, i) => <li key={i}><span>{text}</span></li>)}
                    </ol>
                </>
            ) : null}
        </div>
    )
}

export default TastingNotesTextCompletion;
