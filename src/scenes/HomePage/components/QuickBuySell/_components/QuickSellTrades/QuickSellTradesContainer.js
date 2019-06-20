import { connect } from 'react-redux';
import { sellTradesActions } from '@ducks/trades/sell';
import { tradesSelector } from '@ducks/trades/selectors';
import QuickSellTradesDisplay from './QuickSellTradesDisplay';

function mapStateToProps(state) {
  return {
    loading: state.trades.sell.loading,
    sellTradesData: tradesSelector(state.trades.sell.data),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSellTradesRequest(params) {
      dispatch(sellTradesActions.getSellTradesRequest(params));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSellTradesDisplay);
