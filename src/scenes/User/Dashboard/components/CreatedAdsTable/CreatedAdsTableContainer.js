import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import CreatedAdsTableDisplay from './CreatedAdsTableDisplay';

function mapStateToProps(state) {
  return {
    tradesData: tradesSelectors.tradesSelector(state, { type: 'trades' }),
    loading: tradesSelectors.tradeLoadingSelector(state, { type: 'trades' }),
  };
}
export default connect(mapStateToProps)(CreatedAdsTableDisplay);
