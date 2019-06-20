/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';

class TransactionLimits extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      min: value.min || '',
      max: value.max || '',
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
    const number = parseInt(e.target.value, 10) || '';
    if (!('value' in this.props)) {
      this.setState({ [e.target.name]: number });
    }
    this.triggerChange({ [e.target.name]: number });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { form } = this.props;
    return (
      <Input.Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        From
        <Input
          style={{ margin: '0 10px' }}
          placeholder="Minimum"
          value={this.state.min}
          onChange={this.handleNumberChange}
          name="min"
          addonAfter={form.getFieldsValue(['currency']).currency}
        />
        to
        <Input
          style={{ marginLeft: '10px' }}
          placeholder="Maximum"
          value={this.state.max}
          onChange={this.handleNumberChange}
          name="max"
          addonAfter={form.getFieldsValue(['currency']).currency}
        />
      </Input.Group>
    );
  }
}

export default TransactionLimits;
