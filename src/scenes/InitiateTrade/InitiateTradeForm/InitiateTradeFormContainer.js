import { connect } from 'react-redux';

import InitiateTradeFormDisplay from './InitiateTradeFormDisplay';

import { tradeActions } from '@ducks/trades/trade';
import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    submitting: state._global.submitting,
    user: authSelectors.userSelector(state),
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
