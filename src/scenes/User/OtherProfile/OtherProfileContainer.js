import { connect } from 'react-redux';
import { adsActions } from '@ducks/ads/ads';
// eslint-disable-next-line import/no-unresolved
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
