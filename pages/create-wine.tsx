import type {NextPage} from 'next'
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';
import CreateWineForm from '../components/create-wine-form/create-wine-form';

const CreateWine: NextPage = () => {
    return (
        <PageWrapper>
            <CreateWineForm/>
        </PageWrapper>
    )
}

export default CreateWine;
