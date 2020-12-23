import { connect } from 'react-redux';

import AdsDisplay from './AdsDisplay';

import { meSelectors } from '@ducks/me';
import { adsActions, adsSelectors } from '@ducks/ads';

function mapStateToProps(state) {
  return {
    data: adsSelectors.dataSelector(state),
    loading: adsSelectors.loadingSelector(state),
    countryData: meSelectors.countryDataSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAdsRequest(params) {
      dispatch(adsActions.getAllRequest(params));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdsDisplay);
