import { connect } from 'react-redux';
import { tradesActions } from '@ducks/trades/trades';
import DashboardDisplay from './DashboardDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getCreatedAdsRequest(params) {
      dispatch(tradesActions.getCreatedAdsRequest(params));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(DashboardDisplay);
