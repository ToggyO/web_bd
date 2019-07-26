import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { Tabs } from 'antd';
import { Refresher } from '@components/Refresher';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ROUTES } from '@config/constants';
import { CreatedAdsTableContainer } from './components/CreatedAdsTable';
import { TradesDashboardTableContainer } from './components/TradesDashboardTable';
import { catchFromPath } from '@utils/';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({
  getMyCreatedAdsRequest,
  getNewTradesRequest,
  getActiveTradesRequest,
  getCompletedTradesRequest,
  deleteNewTradeRequest,
  tradesLoading,
}) => {
  useEffect(() => {
    const path = catchFromPath(history.location.pathname, 'dashboard');
    if (path === 'created' || path === '') getMyCreatedAdsRequest();
    if (path === 'requests') getNewTradesRequest();
    if (path === 'active') getActiveTradesRequest();
    if (path === 'completed') getCompletedTradesRequest();
  }, [history.location.pathname]);

  const handleChangeTab = tab => {
    history.push(ROUTES.DASHBOARD[tab]);
  };

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="dashboard custom-tabs">
          <Tabs
            defaultActiveKey={
              catchFromPath(history.location.pathname, 'dashboard').toUpperCase() || 'CREATED'
            }
            tabPosition="left"
            size="small"
            onChange={handleChangeTab}
          >
            <TabPane tab="Created ads" key="CREATED">
              <h2 className="dashboard__header">Created ads</h2>

              <CreatedAdsTableContainer withTerms />
            </TabPane>
            <TabPane tab="Trade requests" key="REQUESTS">
              <h2 className="dashboard__header">
                Trade requests <Refresher loading={tradesLoading} cb={getNewTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms requests onDelete={deleteNewTradeRequest} />
            </TabPane>
            <TabPane tab="Active trades" key="ACTIVE">
              <h2 className="dashboard__header">
                Active trades <Refresher loading={tradesLoading} cb={getActiveTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms onDelete={deleteNewTradeRequest} />
            </TabPane>
            <TabPane tab="Completed trades" key="COMPLETED">
              <h2 className="dashboard__header">
                Completed trades <Refresher loading={tradesLoading} cb={getCompletedTradesRequest} />
              </h2>
              <TradesDashboardTableContainer withTerms />
            </TabPane>
            <TabPane tab="Canceled trades" key="CANCELED">
              <h2 className="dashboard__header">Canceled trades</h2>
              <div>Canceled trades</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

DashboardDisplay.propTypes = {
  getMyCreatedAdsRequest: PropTypes.func,
  getNewTradesRequest: PropTypes.func,
  getActiveTradesRequest: PropTypes.func,
  getCompletedTradesRequest: PropTypes.func,
  deleteNewTradeRequest: PropTypes.func,
  tradesLoading: PropTypes.bool,
};
export default DashboardDisplay;
