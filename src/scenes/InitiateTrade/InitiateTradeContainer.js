import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import { tradesSelectors } from '@ducks/trades';
import InitiateTradeDisplay from './InitiateTradeDisplay';

function mapStateToProps(state) {
  return {
    specificTrade: tradesSelectors.tradeSelector(state, { type: 'trade' }),
    loading: tradesSelectors.tradeLoadingSelector(state, { type: 'trade' }),
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
