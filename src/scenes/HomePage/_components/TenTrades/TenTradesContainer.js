import { connect } from 'react-redux';
import { buyTradesActions } from '@ducks/trades/buy';
import { sellTradesActions } from '@ducks/trades/sell';
import { tradesLoadingSelector } from '@ducks/trades/selectors';
import TenTradesDisplay from './TenTradesDisplay';

function mapStateToProps(state, props) {
  return {
    loading: tradesLoadingSelector(state, props),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  if (ownProps.type.toLowerCase() === 'buy') {
    return {
      getTradesRequest(params) {
        dispatch(buyTradesActions.getBuyTradesRequest(params));
      },
    };
  }
  if (ownProps.type.toLowerCase() === 'sell') {
    return {
      getTradesRequest(params) {
        dispatch(sellTradesActions.getSellTradesRequest(params));
      },
    };
  }
  return undefined;
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TenTradesDisplay);
