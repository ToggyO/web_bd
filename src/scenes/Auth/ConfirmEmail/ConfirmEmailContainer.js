import { connect } from 'react-redux';

import ConfirmEmailDisplay from './ConfirmEmailDisplay';

import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    email: authSelectors.emailSelector(state),
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(ConfirmEmailDisplay);
