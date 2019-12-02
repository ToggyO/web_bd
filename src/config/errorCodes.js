import React from 'react';

export const errorCodes = {
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
      if you feel this is a mistake.
    </p>
  ),
};
