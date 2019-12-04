/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon, Tabs } from 'antd';

import { AdsTable } from '@scenes/_components/AdsTable';
import { Reviews } from '@scenes/_components/Reviews';

const { TabPane } = Tabs;

export const UserHistory = ({
  onTabChange,
  addsData,
  addsTotal,
  loadingAdds,
  onTableChange,
  reviewsData,
  reviewsTotal,
  loadingReviews,
  likesCount,
  onReviewPageChange,
}) => {
  const [initialAdsLoading, setInitialAdsLoading] = useState(false);

  useEffect(() => {
    setInitialAdsLoading(() => true);
  }, []);

  useEffect(() => {
    if (addsTotal) setInitialAdsLoading(() => false);
  }, [addsTotal]);

  const renderAdsTabHead = () => (
    <span>
      Ads{' '}
      {loadingAdds && initialAdsLoading ? (
        <Icon type="loading" style={{ marginRight: 0, marginLeft: 6 }} />
      ) : (
        <span>({addsTotal})</span>
      )}
    </span>
  );

  const renderReviewsTabHead = () => (
    <span>
      Reviews{' '}
      {(() => {
        switch (loadingReviews) {
          case false: {
            if (!reviewsTotal) {
              return null;
            }
            if (reviewsTotal) {
              return <span>({reviewsTotal})</span>;
            }
            break;
          }
          case true: {
            if (!reviewsTotal) {
              return <Icon type="loading" style={{ marginRight: 0, marginLeft: 6 }} />;
            }
            if (reviewsTotal) {
              return <span>({reviewsTotal})</span>;
            }
            break;
          }
          default:
            return null;
        }
        return void 0;
      })()}
    </span>
  );

  return (
    <div className="paper paper--white user__main">
      <Tabs defaultActiveKey="ads" onChange={onTabChange}>
        <TabPane tab={renderAdsTabHead()} key="ads">
          <AdsTable data={addsData} loading={loadingAdds} onChange={onTableChange} type="all" />
        </TabPane>
        <TabPane tab={renderReviewsTabHead()} key="reviews">
          <Reviews
            data={reviewsData}
            loading={loadingReviews}
            likesCount={likesCount}
            onChange={onReviewPageChange}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
