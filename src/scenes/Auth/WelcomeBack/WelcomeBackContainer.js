import { connect } from 'react-redux';

import WelcomeBackDisplay from './WelcomeBackDisplay';

import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
    phoneNumberConfirmed: authSelectors.phoneNumberConfirmedSelector(state),
  };
}
export default connect(mapStateToProps)(WelcomeBackDisplay);
