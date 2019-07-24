import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import { tradeActions } from '@ducks/trades/trade';
import TradeDisplay from './TradeDisplay';

function mapStateToProps(state) {
  return {
    loading: tradesSelectors.tradeLoadingSelector(state),
    specificTrade: tradesSelectors.tradeSelector(state),
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
)(TradeDisplay);
