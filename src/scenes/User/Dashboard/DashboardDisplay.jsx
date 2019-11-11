import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { CreatedAdsTableContainer } from './components/CreatedAdsTable';
import { TradesDashboardTableContainer } from './components/TradesDashboardTable';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { Refresher } from '@components/Refresher';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import { catchFromPath } from '@utils/';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({
  getMyCreatedAdsRequest,
  getNewTradesRequest,
  getActiveTradesRequest,
  getCompletedTradesRequest,
  getCanceledTradesRequest,
  deleteNewTradeRequest,
  tradesLoading,
}) => {
  useEffect(() => {
    const path = catchFromPath(history.location.pathname, 'dashboard');
    if (path === '' || path === 'created') getMyCreatedAdsRequest();
    if (path === 'requests') getNewTradesRequest();
    if (path === 'active') getActiveTradesRequest();
    if (path === 'completed') getCompletedTradesRequest();
    if (path === 'canceled') getCanceledTradesRequest();
  }, [history.location.pathname]);

  const handleChangeTab = tab => {
    history.push(ROUTES.DASHBOARD[tab]);
  };

  return (
    <HelmetWrapper title="Dashboard - Bitcoins Direct" description="Dashboard">
      <div className="paper">
        <div className="dashboard custom-tabs">
          <Tabs
            defaultActiveKey={
              catchFromPath(history.location.pathname, 'dashboard').toUpperCase() || 'CREATED'
            }
            tabPosition={window.matchMedia('(max-width: 1024px)').matches ? 'top' : 'left'}
            size="small"
            onChange={handleChangeTab}
          >
            <TabPane
              tab={window.matchMedia('(max-width: 1024px)').matches ? 'Ads' : 'Created ads'}
              key="CREATED"
            >
              <h2 className="dashboard__header">Created ads</h2>

              <CreatedAdsTableContainer withTerms />
            </TabPane>
            <TabPane
              tab={window.matchMedia('(max-width: 1024px)').matches ? 'Requests' : 'Trade requests'}
              key="REQUESTS"
            >
              <h2 className="dashboard__header">
                Trade requests <Refresher loading={tradesLoading} cb={getNewTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms type="requests" onDecline={deleteNewTradeRequest} />
            </TabPane>
            <TabPane
              tab={window.matchMedia('(max-width: 1024px)').matches ? 'Active' : 'Active trades'}
              key="ACTIVE"
            >
              <h2 className="dashboard__header">
                Active trades <Refresher loading={tradesLoading} cb={getActiveTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms type="active" onDispute={() => {}} />
            </TabPane>
            <TabPane
              tab={window.matchMedia('(max-width: 1024px)').matches ? 'Completed' : 'Completed trades'}
              key="COMPLETED"
            >
              <h2 className="dashboard__header">
                Completed trades <Refresher loading={tradesLoading} cb={getCompletedTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms />
            </TabPane>
            <TabPane
              tab={window.matchMedia('(max-width: 1024px)').matches ? 'Canceled' : 'Canceled trades'}
              key="CANCELED"
            >
              <h2 className="dashboard__header">Canceled trades</h2>
              <TradesDashboardTableContainer withTerms />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </HelmetWrapper>
  );
};

DashboardDisplay.propTypes = {
  getMyCreatedAdsRequest: PropTypes.func,
  getNewTradesRequest: PropTypes.func,
  getActiveTradesRequest: PropTypes.func,
  getCompletedTradesRequest: PropTypes.func,
  getCanceledTradesRequest: PropTypes.func,
  deleteNewTradeRequest: PropTypes.func,
  tradesLoading: PropTypes.bool,
};
export default DashboardDisplay;
