import { connect } from 'react-redux';
import { buyAdsActions } from '@ducks/ads/buy';
import { sellAdsActions } from '@ducks/ads/sell';
import * as adsSelectors from '@ducks/ads/selectors';
import TradesDisplay from './TradesDisplay';

function mapStateToProps(state, props) {
  return {
    adsData: adsSelectors.adsSelector(state, props),
    loading: adsSelectors.adsLoadingSelector(state, props),
    totalPages: adsSelectors.totalPagesQuantitySelector(state, props),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  if (ownProps.type.toLowerCase() === 'buy') {
    return {
      getAdsRequest(query) {
        dispatch(buyAdsActions.getBuyAdsRequest(query));
      },
    };
  }
  if (ownProps.type.toLowerCase() === 'sell') {
    return {
      getAdsRequest(query) {
        dispatch(sellAdsActions.getSellAdsRequest(query));
      },
    };
  }
  return undefined;
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesDisplay);
