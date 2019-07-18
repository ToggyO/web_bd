import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import { adsSelectors } from '@ducks/ads';
import InitiateTradeDisplay from './InitiateTradeDisplay';

function mapStateToProps(state) {
  return {
    specificTrade: adsSelectors.adSelector(state, { type: 'ad' }),
    loading: adsSelectors.adsLoadingSelector(state, { type: 'ad' }),
    cachedUserName: state.auth.data.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTradeByIdRequest(id) {
      dispatch(tradeActions.getTradeByIdRequest(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateTradeDisplay);
