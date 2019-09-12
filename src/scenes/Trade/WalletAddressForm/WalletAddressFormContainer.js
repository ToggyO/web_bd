import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';

import WalletAddressFormDisplay from './WalletAddressFormDisplay';

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
