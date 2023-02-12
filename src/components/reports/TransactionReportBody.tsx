import { GET_TRANSACTIONS, _nodeToTransaction, _useTransactionFilter } from '../../apollo/get-transactions'
import { TransactionReportFilter } from '../../filters/TransactionReportFilter'
import { Transaction } from '../../model/Transaction'
import DataTable from '../data-driven/DataTable'
import { userColumnDefs as transactionColumnDefs } from '../data-driven/TransactionColumnDefs'


export interface TransactionReportBodyProps {
    className?: string
    filter?: TransactionReportFilter
}


const TransactionTable = DataTable<Transaction>()


export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '', filter }) => {

    console.debug(`Filter is ${JSON.stringify(filter)}`)

    return (
        <div className={className}>
            <TransactionTable filters={_useTransactionFilter(filter)}
                graphQuery={GET_TRANSACTIONS}
                queryResultToDataMapper={(result) => result && result.data ? result.data.transactionsRelayConnection.edges.map((node: any) => _nodeToTransaction(node.node)): []}
                columnDefs={transactionColumnDefs} />
        </div>
    )
}