import { connect } from 'react-redux';
import ConfirmEmailDisplay from './ConfirmEmailDisplay';

function mapStateToProps(state) {
  return {
    email: state.sign.data.email,
  };
}

export default connect(mapStateToProps)(ConfirmEmailDisplay);
