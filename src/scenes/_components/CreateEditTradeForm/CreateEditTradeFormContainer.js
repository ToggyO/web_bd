import { connect } from 'react-redux';
import { authSelectors } from '@ducks/auth';

import CreateEditTradeFormDisplay from './CreateEditTradeFormDisplay';

function mapStateToProps(state, props) {
  return {
    isAuthorized: !!authSelectors.userNameSelector(state),
    loading: state._global.localLoading,
    onSubmit: props.onSubmit,
    isCurrency: !!state.trades.trade.data.currency,
  };
}

export default connect(mapStateToProps)(CreateEditTradeFormDisplay);
