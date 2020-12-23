import { connect } from 'react-redux';

import TradesDashboardTableDisplay from './TradesDashboardTableDisplay';

import { tradesSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    tradesData: tradesSelectors.tradesSelector(state),
    loading: tradesSelectors.tradesLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(TradesDashboardTableDisplay);
