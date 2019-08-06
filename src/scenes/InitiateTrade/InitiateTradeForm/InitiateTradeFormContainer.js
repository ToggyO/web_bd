import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import { authSelectors } from '@ducks/auth';
import InitiateTradeFormDisplay from './InitiateTradeFormDisplay';

function mapStateToProps(state) {
  return {
    submitting: state._global.submitting,
    isAuthorized: !!authSelectors.userNameSelector(state),
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
