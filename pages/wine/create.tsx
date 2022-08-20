import type {NextPage} from 'next'
import PageWrapper from '../../components/structure/page-wrapper/page-wrapper';
import StoreWineForm from '../../components/create-wine-form/store-wine-form';

const Create: NextPage = () => {
    return (
        <PageWrapper>
            <StoreWineForm/>
        </PageWrapper>
    )
}

export default Create;
