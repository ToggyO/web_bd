import user from './reducer';

import * as userProfileTypes from './types';
import * as userActions from './actions';
import * as userSagas from './sagas';
import * as userProfileSelectors from './selectors';

export { userProfileTypes, userActions, userSagas, userProfileSelectors };

export default user;
