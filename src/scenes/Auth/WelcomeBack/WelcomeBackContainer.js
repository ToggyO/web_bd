import { connect } from 'react-redux';
import { authSelectors } from 'src/ducks/auth';
import WelcomeBackDisplay from './WelcomeBackDisplay';

function mapStateToProps(state) {
  return {
    emailConfirmed: authSelectors.emailConfirmedSelector(state),
    phoneNumberConfirmed: authSelectors.phoneNumberConfirmedSelector(state),
  };
}
export default connect(mapStateToProps)(WelcomeBackDisplay);
