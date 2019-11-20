import { connect } from 'react-redux';

import DrawerDisplay from './DrawerDisplay';

import { searchActions } from '@ducks/ads/search';

function mapDispatchToProps(dispatch) {
  return {
    cleanState() {
      dispatch(searchActions.cleanState());
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(DrawerDisplay);
