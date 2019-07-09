import { connect } from 'react-redux';
import { tradesActions } from '@ducks/trades/trades';
import DashboardDisplay from './DashboardDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getMyCreatedAdsRequest(params) {
      dispatch(tradesActions.getMyCreatedAdsRequest(params));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(DashboardDisplay);
