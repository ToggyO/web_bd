import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Pagination, Empty, Divider } from 'antd';
import moment from 'moment';

import { Spinner } from '@components/Spinner';
import { likes } from '@config';
import { catchFromPath } from '@utils';
import history from '@services/history';

import './style.less';

export const Reviews = ({
  data: { items, pagination },
  loading,
  onChange,
  // reviewsTotalQuantity,
  // likesCount,
  // getReviewsByUserNameRequest,
}) => {
  const userName = catchFromPath(history.location.pathname, 'users');

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(false);
  // }, [reviewsData]);

  // const handleChange = page => {
  //   setLoading(true);
  //   getReviewsByUserNameRequest(`${userName}?pageSize=5&page=${page}`);
  // };
  return (
    <div>
      {/* <Spin spinning={reviewsLoading || loading} indicator={<Spinner />}> */}
      <Spin spinning={loading} indicator={<Spinner />}>
        {items.length ? (
          <>
            <div className="review-summary">
              {/* Completed trades: <span>{likesCount.totalTrades}</span> */}
              Completed trades: <span>c</span>
              <Divider type="vertical" />
              {/* Thumb-up: <span>{likesCount.liked}</span> */}
              Thumb-up: <span>u</span>
              <Divider type="vertical" />
              {/* Thumb-down: <span>{likesCount.disliked}</span> */}
              Thumb-down: <span>d</span>
            </div>
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
};

// UserReviewsDisplay.propTypes = {
//   reviewsLoading: PropTypes.bool,
//   reviewsTotalQuantity: PropTypes.number,

//   reviewsData: PropTypes.arrayOf(
//     PropTypes.shape({
//       createDate: PropTypes.string,
//       id: PropTypes.string,
//       message: PropTypes.string,
//       titleEnum: PropTypes.string,
//     }),
//   ),
//   likesCount: PropTypes.shape({
//     totalTrades: PropTypes.number,
//     liked: PropTypes.number,
//     disliked: PropTypes.number,
//   }),

//   getReviewsByUserNameRequest: PropTypes.func,
// };
