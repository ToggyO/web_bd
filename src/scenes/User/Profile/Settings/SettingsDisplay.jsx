import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, List, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { Spinner } from '@components/Spinner';
import { secretize } from '@utils';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';

import './style.less';

const { TabPane } = Tabs;
const SettingsDisplay = ({
  fullName,
  userName,
  phoneNumber,
  email,
  loading,
  getProfileRequest,

  // eslint-disable-next-line no-unused-vars
  verificationStatus,
}) => {
  useEffect(() => {
    getProfileRequest();
  }, []);
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="user-settings custom-tabs">
          <Tabs defaultActiveKey="1" tabPosition="left" size="small">
            <TabPane tab="Profile settings" key="1">
              <h2 className="user-settings__header">Profile settings</h2>

              <List className="user-settings__list" itemLayout="horizontal">
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_FULLNAME}>
                      Change <span>name</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Real Name"
                    description={loading ? <Spinner fontSize={15} /> : fullName}
                  />
                  {(() => {
                    switch (verificationStatus) {
                      case 'New':
                      case 'Declined':
                        return (
                          <Link
                            to={ROUTES.SETTINGS.REQUEST_VERIFICATION}
                            className="user-settings__verification"
                          >
                            Request Verification
                          </Link>
                        );
                      case 'Pending':
                        return (
                          <Tag className="user-settings__verification user-settings__verification--on-review">
                            On review
                          </Tag>
                        );
                      case 'Verified':
                        return (
                          <Tag className="user-settings__verification user-settings__verification--verified">
                            Verified
                          </Tag>
                        );

                      default:
                        return undefined;
                    }
                  })()}
                </List.Item>

                <List.Item className="user-settings__item">
                  <List.Item.Meta
                    title="Username"
                    description={loading ? <Spinner fontSize={15} /> : userName}
                  />
                </List.Item>

                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_PHONENUMBER}>
                      Change <span>phone</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Phone Number"
                    description={loading ? <Spinner fontSize={15} /> : secretize(phoneNumber)}
                  />
                </List.Item>
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_EMAIL}>
                      Change <span>email</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Email"
                    description={loading ? <Spinner fontSize={15} /> : secretize(email)}
                  />
                </List.Item>
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_PASSWORD}>
                      Change <span>password</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Account Password"
                    description={loading ? <Spinner fontSize={15} /> : '********'}
                  />
                </List.Item>
                <List.Item className="user-settings__item">
                  <List.Item.Meta title="Confirmed by other users" description="0" />
                </List.Item>
              </List>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

SettingsDisplay.propTypes = {
  fullName: PropTypes.string,
  userName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  loading: PropTypes.bool,
  getProfileRequest: PropTypes.func.isRequired,
  verificationStatus: PropTypes.string,
};

SettingsDisplay.defaultProps = {
  phoneNumber: '',
  email: '',
};

export default SettingsDisplay;
