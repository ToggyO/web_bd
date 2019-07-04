// export const API_URL = 'https://5hekuxyfck.execute-api.eu-west-1.amazonaws.com/prod/api/v0.1';
export const API_URL = 'https://4rzmeh95xa.execute-api.eu-west-1.amazonaws.com/stage/api/v0.1';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CONFIRM_EMAIL: '/confirm-email',
  SUCCESS: '/success',
  SET_2FA: '/set-2fa',
  WELCOME_BACK: '/welcome-back',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: {
    SETTINGS: '/profile',
    EDIT_FULLNAME: '/profile/edit-fullname',
    EDIT_EMAIL: '/profile/edit-email',
    EDIT_PHONENUMBER: '/profile/edit-phonenumber',
    EDIT_PASSWORD: '/profile/edit-password',
    REQUEST_VERIFICATION: '/profile/request-verification',
    OTHER: '/user/:id',
  },
  USER_DASHBOARD: '/dashboard',
  TRADES: {
    CREATE: '/trades/create',
    EDIT_TRADE: '/trades/:id/edit',
    BUY: '/buy-trades',
    SELL: '/sell-trades',
    INITIATE: '/trades/:id/initiate',
  },
};

export const currencies = [
  { name: 'USD', value: 'USD' },
  { name: 'RUB', value: 'RUB' },
  { name: 'VEF', value: 'VEF' },
];
export const locations = [
  { name: 'USA', value: 'USA' },
  { name: 'Russia', value: 'Russia' },
  { name: 'Venezuela', value: 'Venezuela' },
];
export const payments = [
  { name: 'PayPal', value: 'PayPal' },
  { name: 'Counter deposit', value: 'CounterDeposit' },
  { name: 'Cash by mail', value: 'CashByMail' },
  { name: 'Domestic wire transfer', value: 'DomesticWireTransfer' },
  { name: 'Transfer with specific bank', value: 'TransferWithSpecificBank' },
  { name: 'International wire transfer', value: 'InternationalWireTransfer' },
  { name: 'Western Union', value: 'WesternUnion' },
  { name: 'Moneygram', value: 'Moneygram' },
  { name: 'QIWI', value: 'QIWI' },
];

export const pageSize = 25;
export const pageSizeDashboard = 1000;
export const pageSizeOtherProfile = 1000;
