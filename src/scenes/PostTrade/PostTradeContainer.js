import { connect } from 'react-redux';
import { tradeActions } from '@ducks/trades/trade';
import { tradesSelectors } from '@ducks/trades';
import { authSelectors } from '@ducks/auth';
import PostTradeDisplay from './PostTradeDisplay';

function mapStateToProps(state, props) {
  return {
    isAuthorized: !!authSelectors.userNameSelector(state),
    specificTrade: tradesSelectors.tradeSelector(state, props),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postTradeRequest(values) {
      dispatch(tradeActions.postTradeRequest(values));
    },
    persistFormState(values) {
      dispatch(tradeActions.persistFormState(values));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTradeDisplay);
