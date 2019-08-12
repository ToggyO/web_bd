/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Form, Radio, Select, Button, Input, Divider, InputNumber, Tooltip } from 'antd';
import { ROUTES, currencies, locations, payments } from '@config/constants';
import { getInitialValuesBasedOnNavigatorLanguage } from '@services/navigator';
import history from '@services/history';
import * as validations from '@services/validations';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { Spinner } from '@components/Spinner';
import TradeLimits from './_components/TradeLimits';
import './style.less';
import { formatMoney } from '@utils';

const { Option } = Select;

class AdFormDisplay extends React.Component {
  state = {
    loading: false,
    margin: null,
    btcPrice: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.margin && !state.btcPrice) {
      return {
        margin: 0,
        btcPrice: props.specificAd.btcPrice,
      };
    }
    return null;
  }

  async componentDidMount() {
    const { location } = history;
    const { cleanFormState } = this.props;

    if (location.pathname === ROUTES.ADS.CREATE && !location.search) {
      cleanFormState();
      await this.fetchBTCPrice(getInitialValuesBasedOnNavigatorLanguage().currency);
      await this.setZeroFields();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.specificAd.btcPrice === undefined && this.props.specificAd.btcPrice) {
      await this.fetchBTCPrice(this.props.specificAd.currency);
      const margin = formatMoney(
        100 - (this.state.btcPrice * 100) / this.props.specificAd.btcPrice,
        1,
        '.',
        ''
      );
      this.setState({ margin });
      this.props.form.setFieldsValue({
        margin,
        btcPrice: this.props.specificAd.btcPrice,
      });
    }
  }

  setZeroFields = () => {
    const { form } = this.props;
    form.setFieldsValue({
      margin: 0,
      btcPrice: this.state.btcPrice,
    });
  };

  fetchBTCPrice = async value => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.coindesk.com/v1/bpi/currentprice/${value}.json`
    );
    const data = await response.json();
    this.setState({ btcPrice: +data.bpi[value].rate_float.toFixed(2), loading: false });
  };

  handleSubmit = e => {
    const { form, onSubmit, forEdit, isAuthorized, specificAd } = this.props;

    e.preventDefault();

    if (!forEdit && !isAuthorized) {
      const { limits, ...restValues } = form.getFieldsValue();
      onSubmit({
        ...restValues,
        minTradeLimit: limits.minTradeLimit,
        maxTradeLimit: limits.maxTradeLimit,
      });
      return;
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { limits, ...rest } = values;
        const valuesToSubmit = { ...rest, ...limits };
        if (forEdit) {
          onSubmit({ ...valuesToSubmit, id: specificAd.id });
          return;
        }
        onSubmit(valuesToSubmit);
      }
    });
  };

  checkLimits = (rule, value, callback) => {
    if (value.minTradeLimit > 0 && value.maxTradeLimit > 0) {
      if (value.minTradeLimit < value.maxTradeLimit || value.minTradeLimit === value.maxTradeLimit) {
        callback();
        return;
      }
    }

    callback('Min. trade limit should not exceed Max. trade limit');
  };

  handleCurrencyChange = async value => {
    await this.fetchBTCPrice(value);
    await this.setZeroFields();
  };

  handleMarginChange = value => {
    const { form } = this.props;
    form.setFieldsValue({
      btcPrice: (this.state.btcPrice * (100 + +value)) / 100,
    });
  };

  handleBtcPriceChange = e => {
    let value;
    if (e.target.value === '') {
      value = 1;
    } else {
      value = Math.abs(e.target.value);
    }
    const { form } = this.props;
    const { btcPrice } = this.state;

    form.setFieldsValue({
      margin: formatMoney(100 - (btcPrice * 100) / value, 1, '.', ''),
    });
  };

  render() {
    const { form, isAuthorized, loading, forEdit, specificAd } = this.props;
    const payment = form.getFieldValue('payment');

    return (
      <Form onSubmit={this.handleSubmit} className="ad-form" hideRequiredMark>
        <div className="ad-form__block">
          <h3 className="ad-form__header">Trade type</h3>
          <Divider />
          <Form.Item className="ad-form__item">
            {form.getFieldDecorator('type', {
              rules: [{ required: true, message: <div>Please select trade type!</div> }],
              initialValue: specificAd.type || 'Buy',
            })(
              <Radio.Group disabled={history.location.pathname !== ROUTES.ADS.CREATE}>
                <Radio value="Buy">I want to buy bitcoins</Radio>
                <Radio value="Sell">I want to sell bitcoins</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>

        <div className="ad-form__block">
          <h3 className="ad-form__header">Trade information</h3>
          <Divider />
          <Row gutter={48}>
            <Col lg={11}>
              <Form.Item className="ad-form__item" label="Currency">
                {form.getFieldDecorator('currency', {
                  rules: [{ required: true, message: <div>Please select currency!</div> }],
                  initialValue: specificAd.currency || getInitialValuesBasedOnNavigatorLanguage().currency,
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
              <Form.Item className="ad-form__item" label="Location">
                {form.getFieldDecorator('location', {
                  rules: [{ required: true, message: <div>Please select location!</div> }],
                  initialValue: specificAd.location || getInitialValuesBasedOnNavigatorLanguage().location,
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
              <Form.Item className="ad-form__item" label="Payment method">
                {form.getFieldDecorator('payment', {
                  rules: [{ required: true, message: <div>Please select payment method!</div> }],
                  initialValue: specificAd.payment || payments[0].value,
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
                <Form.Item className="ad-form__item ad-form__bank-field" label="Bank name">
                  {form.getFieldDecorator('bankName', {
                    rules: validations.bank,
                    initialValue: specificAd.bankName || null,
                  })(<Input placeholder="Sberbank" />)}
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>

        <div className="ad-form__block">
          <h3 className="ad-form__header">Price</h3>
          <Divider />

          <Row gutter={48}>
            <Col lg={11}>
              <Spin spinning={this.state.loading} tip="Fetching currency..." indicator={<Spinner />}>
                <Form.Item className="ad-form__item" label="BTC trade price">
                  {form.getFieldDecorator('btcPrice', {
                    rules: [
                      { required: true, message: <div>Please input BTC price!</div> },
                      { validator: validations.checkNotNull },
                    ],
                    initialValue: specificAd.btcPrice,
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
              <Tooltip placement="bottom" title={<span> Minimum: -100.00, maximum: 100.00</span>}>
                <div>
                  <Form.Item className="ad-form__item" label="Margin">
                    {form.getFieldDecorator('margin', {
                      rules: [{ required: true, message: <div>Please input margin!</div> }],
                      initialValue: specificAd.margin,
                    })(
                      <InputNumber
                        placeholder="0"
                        formatter={value => `${value}%`}
                        parser={value => {
                          const strValue = value.replace('%', '').replace(',', '');
                          if (strValue === '') return '0.00';
                          if (strValue >= -100 && strValue <= 100) {
                            if (!strValue.match(/^-?\d*[.]?\d{0,2}$/)) {
                              return '0.00';
                            }
                            return strValue;
                          }
                          return '0.00';
                        }}
                        step={0.01}
                        min={-100}
                        max={100}
                        onChange={this.handleMarginChange}
                      />
                    )}
                  </Form.Item>
                </div>
              </Tooltip>
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
              <Form.Item className="ad-form__item" label="Trade limits">
                {form.getFieldDecorator('limits', {
                  initialValue: {
                    minTradeLimit: specificAd.minTradeLimit || 0,
                    maxTradeLimit: specificAd.maxTradeLimit || 0,
                  },
                  rules: [{ required: true }, { validator: this.checkLimits }],
                })(<TradeLimits {...this.props} />)}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="ad-form__block">
          <h3 className="ad-form__header">More information</h3>
          <Divider />
          <Row gutter={48}>
            <Col>
              <Form.Item className="ad-form__item" label="Terms of trade">
                {form.getFieldDecorator('terms', {
                  rules: [
                    { required: true, message: <div>Please input some terms!</div> },
                    { max: 1500, message: <div>Max. 1 500 characters</div> },
                  ],
                  initialValue: specificAd.terms,
                })(
                  <Input.TextArea
                    className=" ad-form__textarea"
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
                {forEdit ? 'Save' : 'Create'}
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

AdFormDisplay.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
  forEdit: PropTypes.bool,
  cleanFormState: PropTypes.func,
  specificAd: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    currency: PropTypes.string,
    payment: PropTypes.string,
    bankName: PropTypes.string,
    margin: PropTypes.number,
    btcPrice: PropTypes.number,
    minTradeLimit: PropTypes.number,
    maxTradeLimit: PropTypes.number,
    terms: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }),
};

AdFormDisplay.defaultProps = {
  specificAd: {
    terms: '',
  },
};

export default Form.create()(AdFormDisplay);
