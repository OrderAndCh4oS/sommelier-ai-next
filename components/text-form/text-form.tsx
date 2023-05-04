import {forwardRef, MouseEvent, MutableRefObject} from 'react';
import * as yup from 'yup';
import styles from './styles.module.css'
import SpinnerIcon from '../icons/spinner.icon';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object({
    text: yup.string()
        .max(1024, 'Must be 1024 characters or less')
        .required('Required')
}).required();

export type TastingNotesFormData = yup.InferType<typeof schema>;

interface IPostPromptFormProps {
    onSubmit: (values: TastingNotesFormData) => void
    handleSave?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>
    isSaving?: boolean
    isProcessing: boolean
    buttonText: string
    placeholder: string
}

const TextForm = forwardRef<HTMLTextAreaElement | null, IPostPromptFormProps>(
    ({
         onSubmit,
         handleSave,
         isSaving,
         isProcessing,
         buttonText,
         placeholder = ''
     },
     forwardedRef
    ) => {
        const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm<TastingNotesFormData>({
            resolver: yupResolver(schema)
        });

        const {ref, ...rest} = register('text');

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formField}>
                    <textarea
                        {...rest}
                        ref={(e) => {
                            ref(e)
                            if (forwardedRef) (forwardedRef as MutableRefObject<HTMLTextAreaElement | null>).current = e // you can still assign to ref
                        }}
                        placeholder={placeholder}
                        className={styles.textField}
                    />
                    {errors.text?.message && <p className={styles.errorMessage}>{errors.text.message}</p>}
                </div>
                <div className={styles.buttonRow}>
                    <button type="submit">{buttonText} {isProcessing ? <SpinnerIcon/> : null}</button>
                    {handleSave ? <button onClick={handleSave}>Save {isSaving ? <SpinnerIcon/> : null}</button> : null}
                </div>
            </form>
        );
    })

export default TextForm;
