import type {NextPage} from 'next'
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';
import WineList from '../components/wine-list/wine-list';

const WineListPage: NextPage = () =>
    <PageWrapper>
        <WineList/>
    </PageWrapper>

export default WineListPage;
