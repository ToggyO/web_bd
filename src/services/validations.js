/* eslint-disable no-useless-escape */
import React from 'react';

export const email = [
  { required: true, message: <div>Please input your email!</div> },
  {
    max: 45,
    message: <div>Please check email format!</div>,
  },
  {
    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    message: <div>Please check email format!</div>,
  },
];

export const phone = [
  {
    required: true,
    message: <div>Please your phone number!</div>,
  },
  {
    pattern: /^[0-9]+$/,
    message: <div>Phone number should include only digits!</div>,
  },
];

export const amount = [
  {
    pattern: /^[0-9]+$/,
    message: <div>Please input amount!</div>,
  },
];

export const username = [
  {
    required: true,
    message: <div>Please input your username!</div>,
  },
  {
    min: 2,
    max: 20,
    message: <div>Username should include from 2 to 20 characters!</div>,
  },
  {
    pattern: /^[a-zA-Z0-9_.]+$/,
    message: <div>Username should contain only following characters: A-Z, a-z, 0-9, ., _,</div>,
  },
];

export const realname = [
  { required: true, message: <div>Please input your real name!</div> },
  { max: 70, message: <div>Real name can not exceed 70 characters limit!</div> },
  {
    pattern: /^[a-zA-Z0-9-' ]+$/,
    message: <div>Please input your real name!</div>,
  },
];

export const password = [
  { required: true, message: <div>Please input your password!</div> },
  {
    pattern: /^(?=.*[a-z])/,
    message: <div>Password should contain at least one lowercase letter (a-z)</div>,
  },
  {
    pattern: /^(?=.*[A-Z])/,
    message: <div>Password should contain at least one uppercase letter (A-Z)</div>,
  },
  {
    pattern: /^(?=.*[0-9])/,
    message: <div>Password should contain at least one digit (0-9)</div>,
  },
  {
    min: 8,
    max: 30,
    message: <div>Password should be 8-30 characters</div>,
  },
];
export const smscode = [
  {
    required: true,
    pattern: /^[a-zA-Z0-9]+$/,
    message: <div>Please enter code from SMS!</div>,
  },
];

export const bank = [
  { required: true, message: <div>Please input bank name</div> },
  { max: 60, message: <div>Max 60 characters</div> },
];
