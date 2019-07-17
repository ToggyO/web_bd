import { connect } from 'react-redux';
import { adsActions } from '@ducks/ads/ads';
import { transactionsActions } from '@ducks/transactions/transactions';
import DashboardDisplay from './DashboardDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getMyCreatedAdsRequest(params) {
      dispatch(adsActions.getMyCreatedAdsRequest(params));
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
