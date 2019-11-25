import { connect } from 'react-redux';

// import { tradesActions, tradesSelectors } from '@ducks/users/user/trades';
// import { requestsActions, requestsSelectors } from '@ducks/users/user/requests';
import UserHistoryDisplay from './UserHistoryDisplay';

import { adsSelectors } from '@ducks/ads';
import { adsActions } from '@ducks/ads/ads';

function mapStateToProps(state) {
  return {
    adsData: adsSelectors.adsSelector(state, { type: 'ads' }),
    adsLoading: adsSelectors.adsLoadingSelector(state, { type: 'ads' }),
    adsTotalQuantity: adsSelectors.adsTotalQuantitySelector(state, { type: 'ads' }),
    // tradesQuantity: tradesSelectors.totalQuantitySelector(state),
    // tradesLoading: tradesSelectors.tradesLoadingSelector(state),
    // requestsQuantity: requestsSelectors.totalQuantitySelector(state),
    // requestsLoading: requestsSelectors.requestsLoadingSelector(state),
    // adsQuantity: adsSelectors.totalQuantitySelector(state),
    // adsLoading: adsSelectors.adsLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCreatedAdsRequest(userName) {
      dispatch(adsActions.getCreatedAdsRequest(userName));
    },
    //   getTradesByUserNameRequest(userName) {
    //     dispatch(tradesActions.getTradesByUserNameRequest(userName));
    //   },
    //   getRequestsByUserNameRequest(userName) {
    //     dispatch(requestsActions.getRequestsByUserNameRequest(userName));
    //   },
    //   getAdsByUserNameRequest(userName) {
    //     dispatch(adsActions.getAdsByUserNameRequest(userName));
    //   },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHistoryDisplay);
