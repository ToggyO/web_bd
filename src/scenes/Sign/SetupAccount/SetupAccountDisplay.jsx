import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import { TwoFactorFormContainer } from './components/TwoFactorForm';
import { GenerateSeedPhraseContainer } from './components/GenerateSeedPhrase';
import { CreateWalletContainer } from './components/CreateWallet';
import './style.less';

const { Step } = Steps;

const SetupAccountDisplay = ({ wizardStep }) => (
  <div className="wizard">
    {/* wizardStep in redux state, if you wanna change step, you have to dispatch corresponding action in saga */}
    <Steps current={wizardStep} className="wizard__stepper">
      <Step title="Set up 2FA" />
      <Step title="Generate seed phrase" />
      <Step title="Create a wallet" />
    </Steps>
    <div className="wizard__content">
      {wizardStep === 0 && (
        <>
          <h1 className="wizard__title">Welcome to Bitcoins Direct</h1>
          <article className="wizard__description">
            <p>We care about your account's security and want your funds to be safe.</p>
            <p>
              Enter phone number and get full access to website's functionality by setting
              2 factor authentication now.
            </p>
          </article>
          <div className="wizard__form-wrapper">
            <TwoFactorFormContainer />
          </div>
        </>
      )}
      {wizardStep === 1 && <GenerateSeedPhraseContainer />}
      {wizardStep === 2 && <CreateWalletContainer />}
    </div>
  </div>
);

SetupAccountDisplay.propTypes = {
  wizardStep: PropTypes.number,
};

SetupAccountDisplay.defaultProps = {
  wizardStep: 0,
};

export default SetupAccountDisplay;
