import { connect } from 'react-redux';
import { authSelectors } from '@ducks/auth';
import ConfirmEmailDisplay from './ConfirmEmailDisplay';

function mapStateToProps(state) {
  return {
    email: authSelectors.emailSelector(state),
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(ConfirmEmailDisplay);
