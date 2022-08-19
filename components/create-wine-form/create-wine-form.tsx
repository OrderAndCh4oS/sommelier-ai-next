import {FC, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import styles from './styles.module.css'
import SpinnerIcon from '../icons/spinner.icon';
import {ICreateWine} from '../../interface/wine-list.interface';
import createWineRequest from '../../requests/wine/create-wine.request';
import {useUser} from '@auth0/nextjs-auth0';

const schema = yup.object({
    name: yup.string().required('Required'),
    style: yup.string().required('Required'),
    country: yup.string().required('Required'),
    region: yup.string().required('Required'),
    vineyard: yup.string().required('Required'),
    vintage: yup.number().required('Required'),
    score: yup.number().required('Required'),
    flavourProfile: yup.string().required('Required'), // Todo: should be array, can just split on commas for now
    detailPrompt: yup.string().required('Required'),
    starterText: yup.string().required('Required'),
})

const initialValues = {
    name: '',
    style: '',
    country: '',
    region: '',
    vineyard: '',
    vintage: new Date().getFullYear(),
    score: 100,
    flavourProfile: '',
    detailPrompt: '',
    starterText: '',
}

const CreateWineForm: FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const {user} = useUser();

    const handleSubmit = async (values: Omit<ICreateWine, 'userId' | 'tastingNote' | 'flavourProfile'> & { flavourProfile: string }) => {
        setIsProcessing(true);
        try {
            await createWineRequest({
                ...values,
                vintage: values.vintage,
                score: values.score,
                flavourProfile: values.flavourProfile.split(', '),
                userId: user!.sub as string,
                tastingNote: 'xxxxx'
            });
        } catch (e) {
            // Todo: handler error
            console.log(e)
        }
        setIsProcessing(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className={styles.formField}>
                    <label htmlFor="name">Name</label>
                    <Field
                        id="name"
                        name="name"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="name"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="score">Score (0-100)</label>
                    <Field
                        id="score"
                        name="score"
                        type="number"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="score"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="style">Style</label>
                    <Field
                        id="style"
                        name="style"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="style"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="country">Country</label>
                    <Field
                        id="country"
                        name="country"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="country"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="region">Region</label>
                    <Field
                        id="region"
                        name="region"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="region"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="vineyard">Vineyard</label>
                    <Field
                        id="vineyard"
                        name="vineyard"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="vineyard"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="vintage">Vintage</label>
                    <Field
                        id="vintage"
                        name="vintage"
                        type="number"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="vintage"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="flavourProfile">Flavours (comma seperated)</label>
                    <Field
                        id="flavourProfile"
                        name="flavourProfile"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="flavourProfile"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="detailPrompt">Details</label>
                    <Field
                        id="detailPrompt"
                        name="detailPrompt"
                        as="textarea"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="detailPrompt"/>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="starterText">Starter Text</label>
                    <Field
                        id="starterText"
                        name="starterText"
                        as="textarea"
                        className={styles.textField}
                    />
                    <div className={styles.errorMessage}>
                        <ErrorMessage name="starterText"/>
                    </div>
                </div>
                <button type="submit">Store {isProcessing ? <SpinnerIcon/> : null}</button>
            </Form>
        </Formik>
    );

}

export default CreateWineForm;
