import { connect } from 'react-redux';

import SetTwoFactorDisplay from './SetTwoFactorDisplay';

import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(SetTwoFactorDisplay);
