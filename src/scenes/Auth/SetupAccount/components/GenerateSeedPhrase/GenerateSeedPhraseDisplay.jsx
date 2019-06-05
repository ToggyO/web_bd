import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

class GenerateSeedPhraseDisplay extends React.Component {
  static propTypes = {
    generatedSeedPhrase: PropTypes.string,
    generateSeedPhrase: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  static defaultProps = {
    generatedSeedPhrase: null,
    errors: null,
  };

  state = {
    seedPhraseAccepted: false,
    seedPhrase: null,
  };

  handleGenerateClick = e => {
    const { generateSeedPhrase, generatedSeedPhrase, errors } = this.props;
    e.preventDefault();
    generateSeedPhrase();

    // if no errors, set phrase to state and enable "I saved seed phrase" button
    if (!errors) this.setState({ seedPhrase: generatedSeedPhrase });
  };

  onAccept = () => {
    this.setState({ seedPhraseAccepted: true });
  };

  render() {
    const { generatedSeedPhrase } = this.props;
    const { seedPhraseAccepted } = this.state;
    return !seedPhraseAccepted ? (
      <>
        <h1 className="wizard__title">We protect your wallet and funds</h1>
        <article className="wizard__description">
          <p>
            This 12 word seed phrase is the most important bit of information for you to
            record and keep safe when managing your Bitcoins Direct account funds.
          </p>
          <p>
            You can write your seed phrase down on a piece of paper, store it on a flash
            drive or simply memorize it.
          </p>
        </article>
        <div className="wizard__form-wrapper seed-form">
          <div className="seed-form__header">
            Seed phrase
            <a className="seed-form__generate" onClick={this.handleGenerateClick}>
              <Icon type="sync" spin={false} className="seed-form__icon" /> Generate
            </a>
          </div>
          <div className="seed-form__fake-input">{generatedSeedPhrase}</div>
          <div className="seed-form__button-group">
            {/* <Button className="seed-form__btn seed-form__btn--back">Back</Button> */}
            <Button
              className="seed-form__btn seed-form__btn--submit"
              type="primary"
              onClick={this.onAccept}
              disabled={!this.state.seedPhrase}
            >
              I saved the seed phrase
            </Button>
          </div>
        </div>
      </>
    ) : (
      <>
        <h1 className="wizard__title">Set up your very own private BTC wallet</h1>
        <p>
          Please repeat seed phrase to complete the wallet creation and to get access to
          trades.
        </p>
      </>
    );
  }
}

export default GenerateSeedPhraseDisplay;
