import { createBoard } from '@wixc3/react-board';
import { Report } from '../../components/report/report';

export default createBoard({
    name: 'Transactions Report',
    Board: () => <div>
        <Report />
    </div>
});
