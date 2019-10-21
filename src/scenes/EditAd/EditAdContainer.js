import { connect } from 'react-redux';

import EditAdDisplay from './EditAdDisplay';

import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';

function mapStateToProps(state, props) {
  return {
    specificAd: adsSelectors.adSelector(state, props),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAdByIdRequest(id) {
      dispatch(adActions.getAdByIdRequest(id));
    },
    editAdRequest(values) {
      dispatch(adActions.editAdRequest(values));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAdDisplay);
