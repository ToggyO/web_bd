import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, List, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES, APP_NAME } from '@config';
import { Spinner } from '@components/Spinner';
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
    <HelmetWrapper title={`Profile Settings - ${APP_NAME}`} description="Profile settings">
      <div className="paper paper--white">
        <div className="user-settings custom-tabs">
          <Tabs
            defaultActiveKey="1"
            tabPosition={window.matchMedia('(max-width: 813px)').matches ? 'top' : 'left'}
            size="small"
          >
            <TabPane tab="Profile settings" key="1">
              <h2 className="user-settings__header">Profile settings</h2>

              <List className="user-settings__list" itemLayout="horizontal">
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_FULLNAME}>
                      Change <span className="hideble-span-xs">name</span>
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
                      Change <span className="hideble-span-xs">phone</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Phone Number"
                    description={loading ? <Spinner fontSize={15} /> : phoneNumber}
                  />
                </List.Item>
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_EMAIL}>
                      Change <span className="hideble-span-xs">email</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta title="Email" description={loading ? <Spinner fontSize={15} /> : email} />
                </List.Item>
                <List.Item
                  className="user-settings__item"
                  actions={[
                    <Link to={ROUTES.SETTINGS.EDIT_PASSWORD}>
                      Change <span className="hideble-span-xs">password</span>
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title="Account Password"
                    description={loading ? <Spinner fontSize={15} /> : '********'}
                  />
                </List.Item>
              </List>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </HelmetWrapper>
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
