/* eslint-disable no-useless-escape */
export const email = [
  { required: true, message: 'Please input your E-Mail' },
  {
    max: 45,
    message: 'Please check email format',
  },
  {
    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    message: 'Please check email format',
  },
];

export const phone = [
  {
    required: true,
    pattern: /^[0-9]+$/,
    message: 'Please your phone number',
  },
];

export const username = [
  {
    required: true,
    message: 'Please input your username',
  },
  {
    min: 2,
    max: 20,
    message: 'Username should include from 2 to 20 characters',
  },
  {
    pattern: /^[a-zA-Z0-9_.]+$/,
    message: 'Username should contain only following characters: A-Z, a-z, 0-9, ., _,',
  },
];

export const realname = [
  { required: true, message: 'Please input your real name' },
  { max: 70, message: 'Full name can not exceed 70 characters limit' },
  {
    pattern: /^[a-zA-Z0-9-' ]+$/,
    message: 'Please input your real name',
  },
];

export const password = [
  { required: true, message: 'Please input your password!' },
  {
    min: 8,
    max: 30,
    message: 'Password should include from 8 to 30 characters',
  },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)\+\=\_\-\{\}\[\]\ \.\,])/,
    message:
      'Password should contain uppercase (A-Z), lowercase (a-z) letters, digit (0-9), special character ~`!@#$%^&*()+=_-{}[] .,',
  },
];
export const smscode = [
  { required: true, pattern: /^[0-9]+$/, message: 'Please enter code from SMS' },
];
