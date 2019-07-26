import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import TradesDashboardTableDisplay from './TradesDashboardTableDisplay';

function mapStateToProps(state) {
  return {
    tradesData: tradesSelectors.tradesSelector(state),
    loading: tradesSelectors.tradesLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(TradesDashboardTableDisplay);
