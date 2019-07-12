import { connect } from 'react-redux';
import { transactionActions } from '@ducks/transactions/transaction';
import InitiateTradeFormDisplay from './InitiateTradeFormDisplay';

function mapStateToProps(state) {
  return {
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initiateTransactionRequest(data) {
      dispatch(transactionActions.initiateTransactionRequest(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateTradeFormDisplay);
