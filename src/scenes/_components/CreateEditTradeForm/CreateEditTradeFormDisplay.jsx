import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Form, Radio, Select, Button, Input, Divider, InputNumber } from 'antd';
import { ROUTES, currencies, locations, payments } from '@config/constants';
import { getInitialValuesBasedOnNavigatorLanguage } from '@services/navigator';
import history from '@services/history';
import * as validations from '@services/validations';
import { ExclamationMessage } from '@components/ExclamationMessage';
import TransactionLimits from './_components/TransactionLimits';
import './style.less';
import { formatMoney } from '@utils';

const { Option } = Select;

class CreateEditTradeFormDisplay extends React.Component {
  state = {
    loading: false,
    margin: 0,
    btcPrice: 0,
  };

  async componentDidMount() {
    const { location } = history;
    const { forEdit, cleanFormState } = this.props;

    if (location.pathname === ROUTES.TRADES.CREATE) cleanFormState();
    if (history.location.search) return;
    if (!forEdit) {
      await this.fetchData(getInitialValuesBasedOnNavigatorLanguage().currency);
      await this.setFields();
    }
  }

  componentDidUpdate(prevProps) {
    const { currency } = this.props.specificTrade;
    if (prevProps.specificTrade.currency !== currency && currency !== undefined) {
      this.fetchData(this.props.specificTrade.currency);
    }
  }

  fetchData = async value => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.coindesk.com/v1/bpi/currentprice/${value}.json`
    );
    const data = await response.json();
    this.setState({ btcPrice: +data.bpi[value].rate_float.toFixed(2), loading: false });
  };

  setFields = () => {
    const { form } = this.props;
    form.setFieldsValue({
      margin: 0,
      btcPrice: this.state.btcPrice,
    });
  };

  handleSubmit = e => {
    const { form, onSubmit, forEdit, isAuthorized, specificTrade } = this.props;

    e.preventDefault();

    if (!forEdit && !isAuthorized) {
      const { limits, ...restValues } = form.getFieldsValue();
      onSubmit({
        ...restValues,
        minTransactionLimit: limits.minTransactionLimit,
        maxTransactionLimit: limits.maxTransactionLimit,
      });
      return;
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { limits, ...rest } = values;
        const valuesToSubmit = { ...rest, ...limits };
        if (forEdit) {
          onSubmit({ ...valuesToSubmit, id: specificTrade.id });
          return;
        }
        onSubmit(valuesToSubmit);
      }
    });
  };

  checkLimits = (rule, value, callback) => {
    if (value.minTransactionLimit > 0 && value.maxTransactionLimit > 0) {
      if (
        value.minTransactionLimit < value.maxTransactionLimit ||
        value.minTransactionLimit === value.maxTransactionLimit
      ) {
        callback();
        return;
      }
    }

    callback('Please check your limits!');
  };

  handleCurrencyChange = async value => {
    await this.fetchData(value);
    await this.setFields();
  };

  handleMarginChange = value => {
    const { form } = this.props;
    form.setFieldsValue({
      btcPrice: (this.state.btcPrice * (100 + +value)) / 100,
    });
  };

  handleBtcPriceChange = e => {
    const value = Math.abs(e.target.value);
    const { form } = this.props;
    form.setFieldsValue({
      margin: formatMoney(100 - (this.state.btcPrice * 100) / value, 1, '.', ''),
    });
  };

  render() {
    const { form, isAuthorized, loading, forEdit, specificTrade } = this.props;
    const payment = form.getFieldValue('payment');

    return (
      <Form onSubmit={this.handleSubmit} className="create-edit-form" hideRequiredMark>
        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Trade type</h3>
          <Divider />
          <Form.Item className="create-edit-form__item">
            {form.getFieldDecorator('type', {
              rules: [{ required: true, message: <div>Please select trade type!</div> }],
              initialValue: specificTrade.type || 'Buy',
            })(
              <Radio.Group>
                <Radio value="Buy">I want to buy bitcoins</Radio>
                <Radio value="Sell">I want to sell bitcoins</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>
        <Spin spinning={loading}>
          <div className="create-edit-form__block">
            <h3 className="create-edit-form__header">Trade information</h3>
            <Divider />
            <Row gutter={48}>
              <Col lg={11}>
                <Form.Item className="create-edit-form__item" label="Currency">
                  {form.getFieldDecorator('currency', {
                    rules: [{ required: true, message: <div>Please select currency!</div> }],
                    initialValue:
                      specificTrade.currency || getInitialValuesBasedOnNavigatorLanguage().currency,
                  })(
                    <Select
                      showSearch
                      placeholder="Select currency"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={this.handleCurrencyChange}
                    >
                      {currencies.map(currency_ => (
                        <Option key={currency_.name} value={currency_.value}>
                          {currency_.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col lg={11}>
                <Form.Item className="create-edit-form__item" label="Location">
                  {form.getFieldDecorator('location', {
                    rules: [{ required: true, message: <div>Please select location!</div> }],
                    initialValue:
                      specificTrade.location || getInitialValuesBasedOnNavigatorLanguage().location,
                  })(
                    <Select
                      showSearch
                      placeholder="Select country"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {locations.map(location_ => (
                        <Option key={location_.name} value={location_.value}>
                          {location_.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col lg={11}>
                <Form.Item className="create-edit-form__item" label="Payment method">
                  {form.getFieldDecorator('payment', {
                    rules: [{ required: true, message: <div>Please select payment method!</div> }],
                    initialValue: specificTrade.payment || payments[0].value,
                  })(
                    <Select
                      showSearch
                      placeholder="Select payment method"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {payments.map(payment_ => (
                        <Option key={payment_.name} value={payment_.value}>
                          {payment_.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {(payment === payments[1].value || payment === payments[4].value) && (
                <Col lg={11}>
                  <Form.Item
                    className="create-edit-form__item create-edit-form__bank-field"
                    label="Bank name"
                  >
                    {form.getFieldDecorator('bankName', {
                      rules: validations.bank,
                      initialValue: specificTrade.bankName || null,
                    })(<Input placeholder="Sberbank" />)}
                  </Form.Item>
                </Col>
              )}
            </Row>
          </div>
        </Spin>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Price</h3>
          <Divider />

          <Row gutter={48}>
            <Col lg={11}>
              <Spin spinning={this.state.loading} tip="Fetching currency...">
                <Form.Item className="create-edit-form__item" label="BTC trade price">
                  {form.getFieldDecorator('btcPrice', {
                    rules: [{ required: true, message: <div>Please input BTC price!</div> }],
                    initialValue: specificTrade.btcPrice || this.state.btcPrice,
                    normalize: (value, prevValue) => {
                      let strValue = value.toString();
                      const index = strValue.indexOf('.');
                      if (index > -1) strValue = strValue.slice(0, index + 3);
                      return strValue.match(/^-?\d*[.]?\d{0,2}$/) ? Math.abs(strValue) : prevValue;
                    },
                  })(
                    <Input
                      placeholder="0"
                      addonAfter={`${form.getFieldsValue(['currency']).currency}/BTC`}
                      onChange={this.handleBtcPriceChange}
                    />
                  )}
                </Form.Item>
              </Spin>
            </Col>

            <Col lg={11}>
              <Form.Item className="create-edit-form__item" label="Margin">
                {form.getFieldDecorator('margin', {
                  rules: [{ required: true, message: <div>Please input margin!</div> }],
                  initialValue: specificTrade.margin || this.state.margin,
                })(
                  <InputNumber
                    placeholder="0"
                    formatter={value => `${value}%`}
                    parser={value => {
                      const strValue = value.replace('%', '').replace(',', '');
                      if (!strValue.match(/^-?\d*[.]?\d{0,2}$/)) {
                        return '0.0';
                      }
                      return strValue;
                    }}
                    step={0.1}
                    min={-100}
                    max={100}
                    onChange={this.handleMarginChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={48} style={{ padding: '0 24px' }}>
            <Col>
              <div className="initiate-trade__note">
                <ExclamationMessage>                 
                  Note that Escrow fee and blockchain transaction fee are charged from a buyer. Current Escrow
                  fee is 0,75% from the trade amount. Current blockchain transaction fee is approximately
                  0.00033239 BTC.
                </ExclamationMessage>
              </div>
            </Col>
          </Row>

          <Row gutter={48}>
            <Col lg={11}>
              <Form.Item className="create-edit-form__item" label="Trade limits">
                {form.getFieldDecorator('limits', {
                  initialValue: {
                    minTransactionLimit: specificTrade.minTransactionLimit || 0,
                    maxTransactionLimit: specificTrade.maxTransactionLimit || 0,
                  },
                  rules: [{ required: true }, { validator: this.checkLimits }],
                })(<TransactionLimits {...this.props} />)}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">More information</h3>
          <Divider />
          <Row gutter={48}>
            <Col>
              <Form.Item className="create-edit-form__item" label="Terms of trade">
                {form.getFieldDecorator('terms', {
                  rules: [
                    { required: true, message: <div>Please input some terms!</div> },
                    { max: 1500, message: <div>Max. 1 500 characters</div> },
                  ],
                  initialValue: specificTrade.terms,
                })(
                  <Input.TextArea
                    className=" create-edit-form__textarea"
                    placeholder="Any other information you wish to tell about your trade"
                    rows={5}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={4}>
            {isAuthorized ? (
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                {forEdit ? 'Edit the trade' : 'Create a trade'}
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                onClick={e => {
                  this.handleSubmit(e);
                  history.push(`${ROUTES.LOGIN}?from=${history.location.pathname}`);
                }}
              >
                Sign In
              </Button>
            )}
            <Form.Item />
          </Col>
        </Row>
      </Form>
    );
  }
}

CreateEditTradeFormDisplay.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
  forEdit: PropTypes.bool,
  cleanFormState: PropTypes.func,
  specificTrade: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    currency: PropTypes.string,
    payment: PropTypes.string,
    bankName: PropTypes.string,
    margin: PropTypes.number,
    btcPrice: PropTypes.number,
    minTransactionLimit: PropTypes.number,
    maxTransactionLimit: PropTypes.number,
    terms: PropTypes.string,
  }),
};

CreateEditTradeFormDisplay.defaultProps = {
  specificTrade: {},
};

export default Form.create()(CreateEditTradeFormDisplay);
