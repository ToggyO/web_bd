import { connect } from 'react-redux';
import { buyTradesActions } from '@ducks/trades/buy';
import { tradesSelector } from '@ducks/trades/selectors';
import BuyTradesDisplay from './BuyTradesDisplay';

function mapStateToProps(state) {
  return {
    loading: state.trades.buy.loading,
    buyTradesData: tradesSelector(state.trades.buy.data),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBuyTradesRequest(params) {
      dispatch(buyTradesActions.getBuyTradesRequest(params));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTradesDisplay);
