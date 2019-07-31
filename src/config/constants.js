export const ROUTES = {
  HOME: '/',
  404: '/404',
  LOGIN: '/login',
  CONFIRM_EMAIL: '/confirm-email',
  SUCCESS: '/success',
  SET_2FA: '/set-2fa',
  WELCOME_BACK: '/welcome-back',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  SETTINGS: {
    ROOT: '/settings',
    EDIT_FULLNAME: '/settings/name/edit',
    EDIT_EMAIL: '/settings/email/edit',
    EDIT_PHONENUMBER: '/settings/phone/edit',
    EDIT_PASSWORD: '/settings/password/edit',
    REQUEST_VERIFICATION: '/settings/verify',
  },

  USER: {
    ROOT: '/user',
    OTHER: '/user/:id',
  },

  DASHBOARD: {
    ROOT: '/dashboard',
    CREATED: '/dashboard/created',
    REQUESTS: '/dashboard/requests',
    ACTIVE: '/dashboard/active',
    COMPLETED: '/dashboard/completed',
    CANCELED: '/dashboard/canceled',
  },
  ADS: {
    CREATE: '/ads/create',
    EDIT: '/ads/:id/edit',
    BUY: '/buy',
    SELL: '/sell',
    INITIATE_TRADE: '/ads/:id',
  },

  TRADES: {
    INITIATE: '/ads/:id',
    ROOT: '/trades',
    TRADE: '/trades/:id',
  },

  DISPUTES: {
    CREATE: '/disputes/create',
  },

  OTHER: {
    HELP: '/help',
    PRIVACY: '/privacy',
    TERMS: '/terms',
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

export const confirmData = {
  requests: {
    texts: {
      title: 'Confirm declining trade request',
      content: 'Are you sure you want to decline this request?',
    },
    buttons: {
      okText: 'Yes',
      cancelText: 'No',
    },
  },
  active: {
    texts: {
      title: 'Confirm canceling trade',
      content: 'Are you sure you want to cancel this trade?',
    },
    buttons: {
      okText: 'Yes',
      cancelText: 'No',
    },
  },
  dispute: {
    texts: {
      title: 'Confirm initiating dispute',
      content: 'Are you sure you want to initiate a dispute?',
    },
    buttons: {
      okText: 'Yes',
      cancelText: 'No',
    },
  },
};
