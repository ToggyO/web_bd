import React from 'react';

import { userLogout } from '@services/auth';

export const errorTitle = {
  400: 'The server was unable to process the request.',
  401: 'The user does not have permission.',
  403: 'Forbidden.',
  404: 'Page not found.',
  406: 'The format of the request is not available.',
  410: 'The requested resource has been permanently removed.',
  422: 'Unprocessable Entity.',
  500: 'Internal Server Error.',
  502: 'Gateway error.',
  503: 'The server is not available.',
  504: 'The gateway timeout.',
};

export const errorMessage = {
  internal_error: <p>Please try again later</p>,
  'sec.refresh_token_invalid': (
    <div>
      <p>You need to relogin to your account</p> <a onClick={() => userLogout('login')}>Logout</a>
    </div>
  ),
  'sec.invalid_auth_data': <p>Incorrect username or password</p>,
  user_not_found: <p>User not found</p>,
  user_duplicate: <p>User already exists</p>,
  code_invalid: <p>Security code is not valid</p>,
  code_expired: <p>Expired code. Request a new one.</p>,
  'sec.login_should_be_confirmed': <p>You have to confirm your email</p>,
  'sec.invalid_code': <p>The link you followed has expired</p>,
  incorrect_old_password: <p>Incorrect old password</p>,
  user_unverified: (
    <p>
      You should <a href="/settings">request verification</a> at first!
    </p>
  ),
  'sec.user_blocked': (
    <p>
      Your account has been suspended as it was identified to be violating Bitcoins Direct terms of use.
      Please contact{' '}
      <a href="https://bitcoinsdirect.freshdesk.com/support/home" target="_blank">
        support
      </a>{' '}
      if you feel this is a mistake
    </p>
  ),
  'per.incorrect_trade_member': <p>This trade doesn't belong to you</p>,
  ad_has_active_trade: <p>Please finish all trades for this ad first</p>,
  ad_not_found: <p>Could not find this ad</p>,
  escrow_not_found: (
    <p>
      Could not find Escrow wallet associated with this trade. Please contact Support for further assistance.
    </p>
  ),
  incorrect_trade_status: <p>Could not update trade status. Please refresh the page and try again.</p>,
  wallet_address_invalid: <p>Please check if the wallet address you have entered is correct</p>,
  phone_number_invalid: <p>Please check if your phone number is valid</p>,
  rating_exist: <p>Could not perform the operation. Please refresh the page and try again.</p>,
  sms_not_send: <p>Could not send text message now. Please try again later.</p>,
  trade_cant_create_on_your_own_ad: <p>You can't request a trade for your own ads</p>,
  trade_not_found: <p>Could not find the requested trade</p>,
};
