import { connect } from 'react-redux';

import TenAdsDisplay from './TenAdsDisplay';

import { buyAdsActions, sellAdsActions, adsSelectors } from '@ducks/ads';

function mapStateToProps(state, props) {
  return {
    loading: adsSelectors.adsLoadingSelector(state, props),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  if (ownProps.type.toLowerCase() === 'buy') {
    return {
      getAdsRequest(params) {
        dispatch(buyAdsActions.getBuyAdsRequest(params));
      },
    };
  }
  if (ownProps.type.toLowerCase() === 'sell') {
    return {
      getAdsRequest(params) {
        dispatch(sellAdsActions.getSellAdsRequest(params));
      },
    };
  }
  return undefined;
}
export default connect(mapStateToProps, mapDispatchToProps)(TenAdsDisplay);
