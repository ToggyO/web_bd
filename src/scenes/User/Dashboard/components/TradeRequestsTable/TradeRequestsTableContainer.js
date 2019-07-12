import { connect } from 'react-redux';
import { transactionsSelectors } from '@ducks/transactions';
import TradeRequestsTableDisplay from './TradeRequestsTableDisplay';

function mapStateToProps(state) {
  return {
    transactionsData: transactionsSelectors.transactionsSelector(state),
    loading: transactionsSelectors.transactionsLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(TradeRequestsTableDisplay);
