import { connect } from 'react-redux';
import { adsActions } from '@ducks/ads/ads';
import OtherProfileDisplay from './OtherProfileDisplay';

function mapDispatchToProps(dispatch) {
  return {
    getCreatedAdsRequest(values) {
      dispatch(adsActions.getCreatedAdsRequest(values));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(OtherProfileDisplay);
