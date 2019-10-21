import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import OtherProfileDisplay from './OtherProfileDisplay';

import { adsActions } from '@ducks/ads/ads';

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
