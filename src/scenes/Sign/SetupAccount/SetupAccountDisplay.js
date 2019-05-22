import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import { TwoFactorFormContainer } from './components/TwoFactorForm';
import './style.less';

const { Step } = Steps;

const SetupAccountDisplay = ({ phoneConfirmed }) => {
  return (
    <div className="wizard">
      <Steps current={0} className="wizard__stepper">
        <Step title="Set up 2FA" />
        <Step title="Generate seed phrase" />
        <Step title="Create a wallet" />
      </Steps>
      <div className="wizard__content">
        {!phoneConfirmed && (
          <>
            <h1 className="wizard__title">Welcome to Bitcoins Direct</h1>
            <article className="wizard__description">
              <p>We care about your account's security and want your funds to be safe.</p>
              <p>
                Enter phone number and get full access to website's functionality by
                setting 2 factor authentication now.
              </p>
            </article>
            <div className="wizard__form-wrapper">
              <TwoFactorFormContainer />
            </div>
          </>
        )}
        {phoneConfirmed && (
          <>
            <h1 className="wizard__title">Welcome to Bitcoins Direct</h1>
            <article className="wizard__description">
              <p>We care about your account's security and want your funds to be safe.</p>
              <p>
                Enter phone number and get full access to website's functionality by
                setting 2 factor authentication now.
              </p>
            </article>
            <div className="wizard__form-wrapper">
              <TwoFactorFormContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

SetupAccountDisplay.propTypes = {
  phoneConfirmed: PropTypes.bool,
};

SetupAccountDisplay.defaultProps = {
  phoneConfirmed: false,
};

export default SetupAccountDisplay;
