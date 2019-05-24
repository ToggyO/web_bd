import { connect } from 'react-redux';

import LoginDisplay from './LoginDisplay';

function mapStateToProps(state) {
  return {
    emailConfirmed: state.sign.data.emailConfirmed,
    phoneNumberConfirmed: state.sign.data.phoneNumberConfirmed,
  };
}

export default connect(mapStateToProps)(LoginDisplay);
