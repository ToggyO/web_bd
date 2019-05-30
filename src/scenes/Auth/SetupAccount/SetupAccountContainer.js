import { connect } from 'react-redux';
import SetupAccountDisplay from './SetupAccountDisplay';

function mapStateToProps(state) {
  return {
    // phoneConfirmed: state.sign.user.wizardStep,
    wizardStep: state.sign.wizardStep,
  };
}

export default connect(mapStateToProps)(SetupAccountDisplay);
