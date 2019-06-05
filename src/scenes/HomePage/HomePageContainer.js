import { connect } from 'react-redux';
import { userProfileSelectors } from 'src/ducks/user';
import HomePageDisplay from './HomePageDisplay';

function mapStateToProps(state) {
  return {
    verificationStatus: !!userProfileSelectors.verificationStatusSelector(state),
    loading: state.user.loading,
  };
}

export default connect(mapStateToProps)(HomePageDisplay);
