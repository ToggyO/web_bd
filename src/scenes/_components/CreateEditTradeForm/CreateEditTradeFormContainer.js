import { connect } from 'react-redux';
import { authSelectors } from '@ducks/auth';
import { tradeActions } from '@ducks/trades/trade';

import CreateEditTradeFormDisplay from './CreateEditTradeFormDisplay';

function mapStateToProps(state, props) {
  return {
    isAuthorized: !!authSelectors.userNameSelector(state),
    loading: state._global.submitting,
    onSubmit: props.onSubmit,
    isCurrency: !!state.trades.trade.data.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cleanFormState() {
      dispatch(tradeActions.cleanFormState());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditTradeFormDisplay);
