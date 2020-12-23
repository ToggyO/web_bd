import { connect } from 'react-redux';

import LoginDisplay from './LoginDisplay';

import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
    phoneNumberConfirmed: authSelectors.phoneNumberConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(LoginDisplay);
