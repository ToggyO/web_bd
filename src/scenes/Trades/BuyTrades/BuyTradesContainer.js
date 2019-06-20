import { connect } from 'react-redux';
import { buyTradesActions } from '@ducks/trades/buy';
import { tradesSelector, tradesLoadingSelector } from '@ducks/trades/selectors';
import BuyTradesDisplay from './BuyTradesDisplay';

function mapStateToProps(state) {
  return {
    buyTradesData: tradesSelector(state.trades.buy.data),
    loading: tradesLoadingSelector(state.trades.buy),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBuyTradesRequest(query) {
      dispatch(buyTradesActions.getBuyTradesRequest(query));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradesDisplay);
