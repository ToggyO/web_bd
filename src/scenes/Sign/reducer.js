import * as actions from './actions';

const initialState = {
  data: {},
  tokens: {},
  loading: false,
  errors: {},
  code: null,
  wizardStep: 0,
};

export default function sign(state = initialState, action) {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
    case actions.SIGNIN_REQUEST:
    case actions.SMS_CODE_REQUEST:
    case actions.TWO_FACTOR_AUTH_REQUEST:
    case actions.FORGOT_PASSWORD_REQUEST:
    case actions.RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, code: null };

    case actions.SIGNUP_SUCCESS: {
      const { data, code } = action.payload;
      // data : {"userName", "email", "phoneNumber", "emailConfirmed", "phoneNumberConfirmed"}
      return { ...state, data, loading: false, code };
    }

    case actions.SIGNIN_SUCCESS: {
      const { data, code } = action.payload;
      const { authInfo, ...tokens } = data;
      return { ...state, data: authInfo.profile, loading: false, code, tokens };
    }

    case actions.SMS_CODE_REQUEST_SUCCESS: {
      const { data } = action.payload;
      return { ...state, loading: false, code: data.code };
    }

    case actions.RESET_PASSWORD_SUCCESS:
    case actions.TWO_FACTOR_AUTH_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }

    case actions.FORGOT_PASSWORD_SUCCESS: {
      const { code } = action.payload;
      return { ...state, loading: false, code };
    }

    case actions.SIGNUP_ERROR:
    case actions.SIGNIN_ERROR:
    case actions.SMS_CODE_REQUEST_ERROR:
    case actions.TWO_FACTOR_AUTH_ERROR:
    case actions.FORGOT_PASSWORD_ERROR:
    case actions.RESET_PASSWORD_ERROR:
      return { ...state, loading: false, errors: action.payload };

    case actions.WIZARD_STEP_1:
      return { ...state, wizardStep: 1 };
    case actions.WIZARD_STEP_2:
      return { ...state, wizardStep: 2 };

    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
