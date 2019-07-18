import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import InitiateTradeFormDisplay from './InitiateTradeFormDisplay';

function mapStateToProps(state) {
  return {
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initiateTradeRequest(data) {
      dispatch(tradeActions.initiateTradeRequest(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateTradeFormDisplay);
