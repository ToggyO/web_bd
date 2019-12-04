import React, { useState, useEffect } from 'react';
import { Button, Icon, Divider, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import { AdsTable } from '@scenes/_components/AdsTable';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { QuickFilterForm } from '@scenes/_components/QuickFilterForm';
import { TenTradesSkeleton } from '@scenes/_components/TenTradesSkeleton';
import { Collapsed } from '@scenes/_components/Collapsed';
import { ROUTES } from '@config';
import history from '@services/history';
import { checkTokens } from '@services/auth';

import { adsSelectors } from '@ducks/ads';
import InnovationImg from '@assets/innovation.svg';
import './style.less';
import superaxios from '@services/superaxios';

const { TabPane } = Tabs;

export const HomePage = () => {
  const [activeKey, setActiveKey] = useState('buy');
  const [loading, setLoading] = useState(false);
  const [buyAds, setBuyAds] = useState([]);
  const [sellAds, setSellAds] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const buyAdsResponse = superaxios({ url: '/ad', params: { 'type[]': 'buy', pageSize: 10, page: 1 } });
      const sellAdsResponse = superaxios({ url: '/ad', params: { 'type[]': 'sell', pageSize: 10, page: 1 } });

      const [buyAdsData = { data: {} }, sellAdsData = { data: {} }] = await Promise.all([
        buyAdsResponse,
        sellAdsResponse,
      ]);

      setBuyAds(
        adsSelectors.dataSelector({
          ads: {
            ads: { data: buyAdsData.data.data },
          },
        }),
      );
      setSellAds(
        adsSelectors.dataSelector({
          ads: { ads: { data: sellAdsData.data.data } },
        }),
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const onTabChange = key => {
    setActiveKey(key);
  };

  const handleSearch = values => {
    history.push({ pathname: activeKey, state: { backpack: values } });
  };

  return (
    <HelmetWrapper title="Home - Bitcoins Direct" description="Home page">
      <div className="paper paper--white home-page">
        {!checkTokens() && (
          <>
            <HelmetWrapper title="Bitcoins Direct - Join us!" description="Home page">
              <div className="easy-way">
                <div className="easy-way__left">
                  <h1 className="easy-way__heading">Easy way to trade bitcoin</h1>
                  <Button
                    type="primary"
                    className="easy-way__btn primary-btn"
                    onClick={() => history.push({ pathname: ROUTES.LOGIN, state: { toSignUp: true } })}
                  >
                    <Icon type="user-add" />
                    Sign up for free
                  </Button>
                </div>
                <div className="easy-way__right">
                  <img src={InnovationImg} alt="Welcome to Bitcoins Direct" className="easy-way__img" />
                </div>
              </div>

              <Divider />
            </HelmetWrapper>
          </>
        )}

        <Collapsed titleWord="filters">
          <div className="quick-filters">
            <Tabs defaultActiveKey={activeKey} className="bd-tabs quick-filters__tabs" onChange={onTabChange}>
              <TabPane tab="Quick buy" key="buy">
                <QuickFilterForm onSearch={handleSearch} />
              </TabPane>
              <TabPane tab="Quick sell" key="sell">
                <QuickFilterForm onSearch={handleSearch} />
              </TabPane>
            </Tabs>
          </div>
        </Collapsed>

        <Divider />
        <div className="quick-buy-sell">
          <div className="quick-buy-sell__ads">
            <h2 className="quick-buy-sell__heading">Buy bitcoins</h2>
            {loading ? (
              <TenTradesSkeleton loading={loading} />
            ) : (
              <AdsTable data={{ items: sellAds.items, pagination: false }} type="sell" classNames="mb-20" />
            )}
            <Link to={ROUTES.ADS.BUY}>Show more buy ads</Link>
          </div>

          <div className="quick-buy-sell__ads">
            <h2 className="quick-buy-sell__heading">Sell bitcoins</h2>
            {loading ? (
              <TenTradesSkeleton loading={loading} />
            ) : (
              <AdsTable data={{ items: buyAds.items, pagination: false }} type="buy" classNames="mb-20" />
            )}
            <Link to={ROUTES.ADS.SELL}>Show more sell ads</Link>
          </div>
        </div>
      </div>
    </HelmetWrapper>
  );
};
