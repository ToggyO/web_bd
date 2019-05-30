import { connect } from 'react-redux';
import LoginDisplay from './LoginDisplay';

function mapStateToProps(state) {
  return {
    emailConfirmed: state.auth.data.emailConfirmed,
    phoneNumberConfirmed: state.auth.data.phoneNumberConfirmed,
  };
}

export default connect(mapStateToProps)(LoginDisplay);
