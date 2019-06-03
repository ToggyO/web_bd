import { connect } from 'react-redux';
import SetupAccountDisplay from './SetupAccountDisplay';

function mapStateToProps(state) {
  return {
    // phoneConfirmed: state.sign.user.wizardStep,
    wizardStep: state.auth.wizardStep,
  };
}

export default connect(mapStateToProps)(SetupAccountDisplay);
