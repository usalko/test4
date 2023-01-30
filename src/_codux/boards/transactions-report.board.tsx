import { createBoard } from '@wixc3/react-board';
import { TransactionReport } from '../../components/reports/TransactionReport';

export default createBoard({
    name: 'Transactions Report',
    Board: () => <div>
        <TransactionReport />
    </div>
});
