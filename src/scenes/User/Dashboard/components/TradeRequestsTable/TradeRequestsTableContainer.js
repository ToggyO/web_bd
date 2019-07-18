import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import TradeRequestsTableDisplay from './TradeRequestsTableDisplay';

function mapStateToProps(state) {
  return {
    tradesData: tradesSelectors.tradesSelector(state),
    loading: tradesSelectors.tradesLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(TradeRequestsTableDisplay);
