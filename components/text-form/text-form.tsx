import {FC} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import styles from './styles.module.css'
import SpinnerIcon from "../icons/spinner.icon";

const schema = yup.object({
    text: yup.string()
        .max(256, 'Must be 256 characters or less')
        .required('Required')
})

interface IPostPromptFormProps<T> {
    handleSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
    isProcessing: boolean
    buttonText: string,
    placeholder: string
}


const TextForm: FC<IPostPromptFormProps<{ text: string }>> = ({handleSubmit, isProcessing, buttonText, placeholder = ''}) => {
    return (
        <Formik
            initialValues={{text: ''}}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className={styles.formField}>
                    <Field
                        name="text"
                        as="textarea"
                        placeholder={placeholder}
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="text"/>
                    </div>
                </div>
                <button type="submit">{buttonText} {isProcessing ? <SpinnerIcon/> : null}</button>
            </Form>
        </Formik>
    );

}

export default TextForm;
