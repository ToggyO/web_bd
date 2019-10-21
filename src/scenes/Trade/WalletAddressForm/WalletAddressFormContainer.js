import { connect } from 'react-redux';

import WalletAddressFormDisplay from './WalletAddressFormDisplay';

import { tradeActions } from '@ducks/trades/trade';

function mapStateToProps(state) {
  return {
    submitting: state._global.submitting,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    confirmTradeRequest(params) {
      dispatch(tradeActions.confirmTradeRequest(params));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddressFormDisplay);
