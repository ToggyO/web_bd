import { connect } from 'react-redux';

import AdsDisplay from './AdsDisplay';

import { meSelectors } from '@ducks/me';
import { addsActions, addsSelectors } from '@ducks/adds';

function mapStateToProps(state) {
  return {
    data: addsSelectors.dataSelector(state),
    loading: addsSelectors.loadingSelector(state),
    countryData: meSelectors.countryDataSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAdsRequest(params) {
      dispatch(addsActions.getAllRequest(params));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdsDisplay);
