import { connect } from 'react-redux';

import EditAdDisplay from './EditAdDisplay';

import { adActions, adSelectors } from '@ducks/ads';

function mapStateToProps(state) {
  return {
    specificAd: adSelectors.dataSelector(state),
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
export default connect(mapStateToProps, mapDispatchToProps)(EditAdDisplay);
