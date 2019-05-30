// prop-types disabled for ant forms
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable no-class-assign */
import React from 'react';
import { Form, Input, Button, Divider } from 'antd';

class CreateWalletForm extends React.Component {
  state = {
    submitDisabled: true,
  };

  compareToGeneratedSeedPhrase = (rule, value, callback) => {
    const { generatedSeedPhrase } = this.props;

    if (value && value !== generatedSeedPhrase) {
      this.setState({ submitDisabled: true });
      callback(
        "Seed phrase you entered doesn't match the phrase we generated for you on the previous step",
      );
    } else {
      this.setState({ submitDisabled: false });
      callback();
    }
  };

  handleSubmit = e => {
    const { form, generatedSeedPhrase } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(generatedSeedPhrase);
      }
    });
  };

  stepBack = () => {
    /* wizardStep to previous step */
    console.log('step back');
  };

  render() {
    const { submitDisabled } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="wizard__form-wrapper">
        <Form.Item>
          {getFieldDecorator('usersSeedPhrase', {
            rules: [
              {
                required: true,
                message: 'Please input seed phrase',
              },
              {
                validator: this.compareToGeneratedSeedPhrase,
              },
            ],
          })(
            <Input.TextArea
              style={{ width: '100%', resize: 'none' }}
              placeholder="Enter seed phrase"
              autosize={{ minRows: 3, maxRows: 3 }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div className="seed-form__button-group">
            <Button
              className="seed-form__btn seed-form__btn--back"
              onClick={this.stepBack}
            >
              Back
            </Button>
            <Button
              className="seed-form__btn seed-form__btn--submit"
              type="primary"
              htmlType="submit"
              disabled={submitDisabled}
            >
              Create the wallet and continue
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

CreateWalletForm = Form.create()(CreateWalletForm);

const CreateWalletDisplay = ({ generatedSeedPhrase }) => (
  <>
    <h1 className="wizard__title">Set up your very own private BTC wallet</h1>
    <p>
      Please repeat seed phrase to complete the wallet creation and to get access to
      trades.
    </p>
    <CreateWalletForm generatedSeedPhrase={generatedSeedPhrase} />
    <Divider />
    <p>
      Remember that you are solely responsible to ensure the safety and security of these
      words; if you ever forget your password and lose the recovery phrase, your funds are
      irretrievable!
    </p>
  </>
);

export default CreateWalletDisplay;
