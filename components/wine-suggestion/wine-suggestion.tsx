import {FC} from 'react';
import {IWineShort} from '../recommendations/recommendations';
import styles from './styles.module.css'

const WineSuggestion: FC<{ wine: IWineShort }> = ({wine}) => {
    return (
        <>
            <h4 className={styles.title}>{wine.name}</h4>
            <p className={styles.subHeading}>{wine.country}, {wine.region} ({wine.vintage})</p>
            <p className={styles.subHeading}>Score: {wine.score}</p>
            <p className={styles.notes}>{wine.notes}</p>
        </>
    )
}

export default WineSuggestion;
