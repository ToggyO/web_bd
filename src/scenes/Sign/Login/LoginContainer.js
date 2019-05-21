import { connect } from 'react-redux';
import {
  registeredStatusSelector,
  emailConfirmedStatusSelector,
  phoneNumberConfirmedStatusSelector,
} from '../selectors';
import LoginDisplay from './LoginDisplay';

function mapStateToProps(state) {
  return {
    isRegistered: !!registeredStatusSelector(state),
    isEmailConfirmed: emailConfirmedStatusSelector(state),
    isPhoneNumberConfirmed: phoneNumberConfirmedStatusSelector(state),
  };
}

export default connect(mapStateToProps)(LoginDisplay);
