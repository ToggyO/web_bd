import { connect } from 'react-redux';
import { authSelectors } from 'src/ducks/auth';
import SetTwoFactorDisplay from './SetTwoFactorDisplay';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
  };
}

export default connect(mapStateToProps)(SetTwoFactorDisplay);
