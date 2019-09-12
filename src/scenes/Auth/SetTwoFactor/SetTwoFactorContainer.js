import { connect } from 'react-redux';
import { authSelectors } from '@ducks/auth';
import SetTwoFactorDisplay from './SetTwoFactorDisplay';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(SetTwoFactorDisplay);
