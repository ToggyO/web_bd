import { connect } from 'react-redux';
import { tradesActions } from '@ducks/trades/trades';
import { transactionsActions } from '@ducks/transactions/transactions';
import DashboardDisplay from './DashboardDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getMyCreatedAdsRequest(params) {
      dispatch(tradesActions.getMyCreatedAdsRequest(params));
    },
    getPendingTransactionsRequest(type) {
      dispatch(transactionsActions.getPendingTransactionsRequest(type));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(DashboardDisplay);
