import { connect } from 'react-redux';
import { registeredStatusSelector } from '../selectors';
import ConfirmEmailDisplay from './ConfirmEmailDisplay';

function mapStateToProps(state) {
  return {
    email: state.sign.data.email,
    registeredEmail: registeredStatusSelector(state),
  };
}

export default connect(mapStateToProps)(ConfirmEmailDisplay);
