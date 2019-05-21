import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { EditPhoneForm } from './components/EditPhoneForm';

class EditPhone extends React.Component {
  static propTypes = {
    isConfirmed: PropTypes.bool,
    togglePage: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.isConfirmed) console.log('Confirmed user');
  }

  render() {
    const { isConfirmed, togglePage } = this.props;
    return (
      <div className="change-setting">
        <a href="#" className="backtoprofile__link" onClick={togglePage}>
          <Icon type="arrow-left" className="backtoprofile__icon" /> Back to profile
          settings
        </a>
        <h2 className="change-setting__header">Change Phone Number</h2>
        {isConfirmed ? (
          <>
            <p>
              Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris
              interesset. Eum te odio zril facilisi, quo singulis torquatos in, sea in
              duis bonorum adipisci. Elit iudico iuvaret vis te. Eligendi scripserit duo
              ne, has eros veniam epicurei eu, quidam mentitum adipisci eos ne.
            </p>
            <EditPhoneForm />
          </>
        ) : (
          <>
            <p>
              Please confirm your email riley419@gmail.com to proceed with the website.
            </p>
            <p>
              Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris
              interesset. Eum te odio zril facilisi, quo singulis torquatos in, sea in
              duis bonorum adipisci. Elit iudico iuvaret vis te. Eligendi scripserit duo
              ne, has eros veniam epicurei eu, quidam mentitum adipisci eos ne.
            </p>
          </>
        )}
      </div>
    );
  }
}

export default EditPhone;
