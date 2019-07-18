import { connect } from 'react-redux';
import { adsActions } from '@ducks/ads/ads';
import { tradesActions } from '@ducks/trades/trades';
import DashboardDisplay from './DashboardDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getMyCreatedAdsRequest(params) {
      dispatch(adsActions.getMyCreatedAdsRequest(params));
    },
    getPendingTradesRequest(type) {
      dispatch(tradesActions.getPendingTradesRequest(type));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(DashboardDisplay);
