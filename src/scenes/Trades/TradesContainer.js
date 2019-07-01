import { connect } from 'react-redux';
import { buyTradesActions } from '@ducks/trades/buy';
import { sellTradesActions } from '@ducks/trades/sell';
import * as tradesSelectors from '@ducks/trades/selectors';
import TradesDisplay from './TradesDisplay';

function mapStateToProps(state, props) {
  return {
    tradesData: tradesSelectors.tradesSelector(state, props),
    loading: tradesSelectors.tradesLoadingSelector(state, props),
    totalPages: tradesSelectors.totalPagesQuantitySelector(state, props),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  if (ownProps.type.toLowerCase() === 'buy') {
    return {
      getTradesRequest(query) {
        dispatch(buyTradesActions.getBuyTradesRequest(query));
      },
    };
  }
  if (ownProps.type.toLowerCase() === 'sell') {
    return {
      getTradesRequest(query) {
        dispatch(sellTradesActions.getSellTradesRequest(query));
      },
    };
  }
  return undefined;
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesDisplay);
