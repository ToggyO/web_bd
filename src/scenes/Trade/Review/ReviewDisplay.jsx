/* eslint-disable react/prop-types */
import React from 'react';
import { Divider, Spin } from 'antd';

import { ReviewFormContainer } from './_components/ReviewForm';

import { Spinner } from '@components/Spinner';

const ReviewDisplay = ({ user, order, tradeId, reviewLoading, getReviewByOrderRequest }) => {
  React.useEffect(() => {
    getReviewByOrderRequest(order);
  }, []);

  return (
    <div className="review">
      <Divider style={{ margin: '16px 0' }} />
      <Spin spinning={reviewLoading} indicator={<Spinner />}>
        <h3>Review</h3>
        <ReviewFormContainer user={user} tradeId={tradeId} />
      </Spin>
    </div>
  );
};

export default ReviewDisplay;
