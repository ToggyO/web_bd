import { connect } from 'react-redux';
import { sellTradesActions } from '@ducks/trades/sell';
import { tradesSelector, tradesLoadingSelector } from '@ducks/trades/selectors';
import SellTradesDisplay from './SellTradesDisplay';

function mapStateToProps(state) {
  return {
    sellTradesData: tradesSelector(state.trades.sell.data),
    loading: tradesLoadingSelector(state.trades.sell),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSellTradesRequest(query) {
      dispatch(sellTradesActions.getSellTradesRequest(query));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTradesDisplay);
