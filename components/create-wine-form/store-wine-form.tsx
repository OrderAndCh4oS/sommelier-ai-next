import {FC, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import styles from './styles.module.css'
import SpinnerIcon from '../icons/spinner.icon';
import IWine, {ICreateWine, IUpdateWine} from '../../interface/wine-list.interface';
import createWineRequest from '../../requests/wine/create-wine.request';
import {useUser} from '@auth0/nextjs-auth0';
import updateWineRequest from '../../requests/wine/update-wine.request';

const schema = yup.object({
    name: yup.string().required('Required'),
    style: yup.string().required('Required'),
    country: yup.string().required('Required'),
    region: yup.string().required('Required'),
    vineyard: yup.string().required('Required'),
    vintage: yup.number().required('Required'),
    score: yup.number().required('Required'),
    flavourProfile: yup.string().required('Required'),
})

let initialValues = {
    name: '',
    style: '',
    country: '',
    region: '',
    vineyard: '',
    vintage: new Date().getFullYear(),
    score: 0,
    flavourProfile: '',
}

type IWineFormValues = Omit<ICreateWine, 'userId' | 'tastingNote' | 'flavourProfile'> & { flavourProfile: string };

const removeNonStoreWineFormValues = (storedWine: IWine) => {
    const tempStoredWine = {...storedWine};
    const initialValuesKeys = Object.keys(initialValues);

    for (const key of Object.keys(tempStoredWine)) {
        if (!initialValuesKeys.includes(key))
            delete (tempStoredWine)[key as keyof IWineFormValues];
    }

    initialValues = {
        ...tempStoredWine,
        flavourProfile: tempStoredWine.flavourProfile.join(', ')
    }
};

const StoreWineForm: FC<{ storedWine?: IWine | null }> = ({storedWine}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const {user} = useUser();

    if (storedWine) removeNonStoreWineFormValues(storedWine);

    const handleSubmit = async (values: IWineFormValues) => {
        setIsProcessing(true);
        try {
            if (!storedWine) {
                await createWineRequest({
                    ...values,
                    flavourProfile: values.flavourProfile.split(', '),
                    userId: user!.sub as string,
                });
            } else {
                const tempStoredWine: Partial<IWine> = {...storedWine};
                delete tempStoredWine.createdAt;
                delete tempStoredWine.updatedAt;
                await updateWineRequest({
                    ...(tempStoredWine as IUpdateWine),
                    ...values,
                    flavourProfile: values.flavourProfile.split(', '),
                });
            }
            // Todo: Show success message, clear form, add to or refresh wine list
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
            enableReinitialize={true}
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
                <button type="submit">Store Wine {isProcessing ? <SpinnerIcon/> : null}</button>
            </Form>
        </Formik>
    );
}

export default StoreWineForm;
