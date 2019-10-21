/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';

class TradeLimits extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      minTradeLimit: value.minTradeLimit || '',
      maxTradeLimit: value.maxTradeLimit || '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  handleNumberChange = e => {
    if (e.target.value.length < 7) {
      const number = parseInt(e.target.value, 10) || '';
      if (!('value' in this.props)) {
        this.setState({ [e.target.name]: number });
      }
      this.triggerChange({ [e.target.name]: number });
    }
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...this.state, ...changedValue });
    }
  };

  render() {
    const { form } = this.props;

    return (
      <Input.Group
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}
      >
        From
        <Input
          style={{ margin: '0 10px' }}
          placeholder="Minimum"
          value={this.state.minTradeLimit}
          onChange={this.handleNumberChange}
          name="minTradeLimit"
          addonAfter={form.getFieldsValue(['currency']).currency}
        />
        to
        <Input
          style={{ marginLeft: '10px' }}
          placeholder="Maximum"
          value={this.state.maxTradeLimit}
          onChange={this.handleNumberChange}
          name="maxTradeLimit"
          addonAfter={form.getFieldsValue(['currency']).currency}
        />
      </Input.Group>
    );
  }
}

export default TradeLimits;
