import {FC, useEffect, useState} from 'react';
import * as yup from 'yup';
import styles from './styles.module.css'
import SpinnerIcon from '../icons/spinner.icon';
import IWine, {ICreateWine, IUpdateWine} from '../../interface/wine-list.interface';
import createWineRequest from '../../requests/wine/create-wine.request';
import updateWineRequest from '../../requests/wine/update-wine.request';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

const schema = yup.object({
    name: yup.string().required('Required'),
    style: yup.string().required('Required'),
    country: yup.string().required('Required'),
    region: yup.string().required('Required'),
    vineyard: yup.string().required('Required'),
    vintage: yup.number().required('Required'),
    score: yup.number().required('Required'),
    flavourProfile: yup.string().required('Required'),
}).required();
type FormData = yup.InferType<typeof schema>;

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

const getInitialValues = (storedWine: IWine) => {
    const tempStoredWine = {...storedWine};
    const initialValuesKeys = Object.keys(initialValues);

    for (const key of Object.keys(tempStoredWine)) {
        if (!initialValuesKeys.includes(key))
            delete (tempStoredWine)[key as keyof IWineFormValues];
    }

    return {
        ...tempStoredWine,
        flavourProfile: tempStoredWine.flavourProfile.join(', ')
    }
};

const StoreWineForm: FC<{ storedWine?: IWine | null }> = ({storedWine}) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    });

    useEffect(() => {
        if(!storedWine) return;
        reset(getInitialValues(storedWine))
    }, [storedWine])

    const onSubmit = async (values: FormData) => {
        setIsProcessing(true);
        try {
            if (!storedWine) {
                await createWineRequest({
                    ...values,
                    flavourProfile: values.flavourProfile.split(', '),
                });
            } else {
                const tempStoredWine: Partial<IWine> = {...storedWine};
                delete tempStoredWine.createdAt;
                delete tempStoredWine.updatedAt;
                await updateWineRequest({
                    ...values,
                    sk: storedWine.sk,
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formField}>
                <label htmlFor="name">Name</label>
                <input
                    {...register("name", { value: 'bill' })}
                    className={styles.textField}
                />
                {errors.name?.message && (
                    <p className={styles.errorMessage}>
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="score">Score (0-100)</label>
                <input
                    {...register("score")}
                    className={styles.textField}
                />
                {errors.score?.message && (
                    <p className={styles.errorMessage}>
                        {errors.score.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="style">Style</label>
                <input
                    {...register("style")}
                    className={styles.textField}
                />
                {errors.style?.message && (
                    <p className={styles.errorMessage}>
                        {errors.style.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="country">Country</label>
                <input
                    {...register("country")}
                    className={styles.textField}
                />
                {errors.country?.message && (
                    <p className={styles.errorMessage}>
                        {errors.country.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="region">Region</label>
                <input
                    {...register("region")}
                    className={styles.textField}
                />
                {errors.region?.message && (
                    <p className={styles.errorMessage}>
                        {errors.region.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="vineyard">Vineyard</label>
                <input
                    {...register("vineyard")}
                    className={styles.textField}
                />
                {errors.vineyard?.message && (
                    <p className={styles.errorMessage}>
                        {errors.vineyard.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="vintage">Vintage</label>
                <input
                    {...register("vintage")}
                    className={styles.textField}
                />
                {errors.vintage?.message && (
                    <p className={styles.errorMessage}>
                        {errors.vintage.message}
                    </p>
                )}
            </div>
            <div className={styles.formField}>
                <label htmlFor="flavourProfile">Flavours (comma seperated)</label>
                <input
                    {...register("flavourProfile")}
                    className={styles.textField}
                />
                {errors.flavourProfile?.message && (
                    <p className={styles.errorMessage}>
                        {errors.flavourProfile.message}
                    </p>
                )}
            </div>
            <button type="submit">Store Wine {isProcessing ? <SpinnerIcon/> : null}</button>
        </form>
    );
}

export default StoreWineForm;
