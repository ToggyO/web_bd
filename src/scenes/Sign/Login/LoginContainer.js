import { connect } from 'react-redux';
import { registeredUserEmailSelector } from '../selectors';
import LoginDisplay from './LoginDisplay';

function mapStateToProps(state) {
  return {
    email: registeredUserEmailSelector(state),
  };
}

export default connect(mapStateToProps)(LoginDisplay);
