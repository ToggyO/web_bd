import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Pagination, Empty, Divider } from 'antd';
import moment from 'moment';

import { Spinner } from '@components/Spinner';
import { likes } from '@config';

import './style.less';

export const Reviews = ({ data: { items, pagination }, loading, likesCount, onChange }) => (
  <div>
    <Spin spinning={loading} indicator={<Spinner />}>
      <div className="review-summary">
        Completed trades: <span>{likesCount.totalTrades}</span>
        <Divider type="vertical" />
        Thumb-up: <span>{likesCount.liked}</span>
        <Divider type="vertical" />
        Thumb-down: <span>{likesCount.disliked}</span>
      </div>
      {items.length ? (
        <>
          {items.map(review => (
            <div className="review-item" key={review.id}>
              <div className="review-item__date">{moment(review.createDate).format('MM.DD.YY h:mm a')}</div>
              <div className="flex align-items-center">
                <span className="review-item__icon">{likes[review.titleEnum].icon}</span>{' '}
                <span className="review-item__title">{likes[review.titleEnum].title}</span>
              </div>
              <p>{review.message}</p>
            </div>
          ))}
          <Pagination {...pagination} onChange={onChange} />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No reviews" />
      )}
    </Spin>
  </div>
);

Reviews.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        createDate: PropTypes.string,
        titleEnum: PropTypes.string,
        message: PropTypes.string,
      }),
    ),
    pagination: PropTypes.object,
  }),
  loading: PropTypes.bool,
  likesCount: PropTypes.shape({
    totalTrades: PropTypes.number,
    liked: PropTypes.number,
    disliked: PropTypes.number,
  }),
  onChange: PropTypes.func,
};
