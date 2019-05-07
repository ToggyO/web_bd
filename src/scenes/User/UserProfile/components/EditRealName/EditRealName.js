import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { EditRealNameForm } from './components/EditRealNameForm';

class EditRealName extends React.Component {
  static propTypes = {
    togglePage: PropTypes.func,
  };

  componentDidMount() {
    console.log('Confirmed user');
  }

  render() {
    const { togglePage } = this.props;
    return (
      <div className="change-setting">
        <a href="" className="backtoprofile__link" onClick={togglePage}>
          <Icon type="arrow-left" className="backtoprofile__icon" /> Back to profile
          settings
        </a>
        <h2 className="change-setting__header">Change Real Name</h2>
        <p>
          Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris
          interesset. Eum te odio zril facilisi, quo singulis torquatos in, sea in duis
          bonorum adipisci. Elit iudico iuvaret vis te. Eligendi scripserit duo ne, has
          eros veniam epicurei eu, quidam mentitum adipisci eos ne.
        </p>

        <EditRealNameForm />
      </div>
    );
  }
}

export default EditRealName;
