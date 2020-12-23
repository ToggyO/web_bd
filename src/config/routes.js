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

  USERS: {
    ROOT: '/users',
    OTHER: '/users/:id',
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
