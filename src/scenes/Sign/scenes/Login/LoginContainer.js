import { connect } from 'react-redux';
import { registeredUserEmailSelector } from 'data/user/selectors';
import { resetUser } from 'data/user/actions';
import LoginDisplay from './LoginDisplay';

function mapStateToProps(state) {
  return {
    email: registeredUserEmailSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetUser(e) {
      e.preventDefault();
      dispatch(resetUser());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginDisplay);
