/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import { MyAdsTable } from './components/MyAdsTable';
import { TradesDashboardTableContainer } from './components/TradesDashboardTable';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { Refresher } from '@components/Refresher';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import { catchFromPath, formatParamsForParakhnevich } from '@utils/';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({
  getMyAdsRequest,
  getNewTradesRequest,
  getActiveTradesRequest,
  getCompletedTradesRequest,
  getCanceledTradesRequest,
  deleteNewTradeRequest,

  adsData,
  loadingAds,
  adStatusLoading,
  submitting,
  deleteAdRequest,
  toggleAdStatusRequest,
  tradesLoading,
}) => {
  const [activeTab, setActiveTab] = useState(
    catchFromPath(history.location.pathname, 'dashboard').toUpperCase() || 'CREATED',
  );

  useEffect(() => {
    if (activeTab === 'CREATED') getMyAdsRequest(formatParamsForParakhnevich({ pageSize: 10 }));
    if (activeTab === 'REQUESTS') getNewTradesRequest();
    if (activeTab === 'ACTIVE') getActiveTradesRequest();
    if (activeTab === 'COMPLETED') getCompletedTradesRequest();
    if (activeTab === 'CANCELED') getCanceledTradesRequest();
  }, [activeTab]);

  const onTableChange = (pagination, filters, sorter) => {
    const sorterParams = {};
    if (sorter.field) {
      sorterParams.field = sorter.field;
      sorterParams.order = sorter.order;
    }

    if (activeTab === 'CREATED')
      getMyAdsRequest(formatParamsForParakhnevich({ ...pagination, ...sorterParams }));
    if (activeTab === 'REQUESTS') getNewTradesRequest();
    if (activeTab === 'ACTIVE') getActiveTradesRequest();
    if (activeTab === 'COMPLETED') getCompletedTradesRequest();
    if (activeTab === 'CANCELED') getCanceledTradesRequest();
  };

  const handleChangeTab = tab => {
    history.push(ROUTES.DASHBOARD[tab]);
    setActiveTab(tab);
  };

  return (
    <HelmetWrapper title="Dashboard - Bitcoins Direct" description="Dashboard">
      <div className="paper paper--white">
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

              <MyAdsTable
                data={adsData}
                loading={loadingAds}
                adStatusLoading={adStatusLoading}
                submitting={submitting}
                onChange={onTableChange}
                deleteAdRequest={deleteAdRequest}
                toggleAdStatusRequest={toggleAdStatusRequest}
                withTerms
              />
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
export default DashboardDisplay;
