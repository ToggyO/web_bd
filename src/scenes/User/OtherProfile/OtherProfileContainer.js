import { connect } from 'react-redux';
import { tradesActions } from '@ducks/trades/trades';
import OtherProfileDisplay from './OtherProfileDIsplay';

function mapDispatchToProps(dispatch) {
  return {
    getCreatedAdsRequest(values) {
      dispatch(tradesActions.getCreatedAdsRequest(values));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(OtherProfileDisplay);
