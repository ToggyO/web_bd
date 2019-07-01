import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import { tradesSelectors } from '@ducks/trades';
import EditTradeDisplay from './EditTradeDisplay';

function mapStateToProps(state, props) {
  return {
    specificTrade: tradesSelectors.tradeForEditSelector(state, props),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getTradeById(id) {
      dispatch(tradeActions.getTradeByIdRequest(id));
    },
    editTradeRequest(values) {
      dispatch(tradeActions.editTradeRequest(values));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTradeDisplay);
