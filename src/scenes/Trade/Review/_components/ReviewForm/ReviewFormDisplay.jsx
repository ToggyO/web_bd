/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Select, Input, Button, Form } from 'antd';

import { ExclamationMessage } from '@components/ExclamationMessage';
import { ROUTES, likes } from '@config';
import './style.less';

const { Option } = Select;

// Best, Good, Bad, Worst
const likesKeys = Object.keys(likes);

const renderOptions = () =>
  likesKeys.map(likeKey => {
    const { title, icon } = likes[likeKey];
    return (
      <Option value={likeKey} key={likeKey}>
        <div className="review-form__option">
          <div className="review-form__icon">{icon}</div>
          <div className="review-form__text">{title}</div>
        </div>
      </Option>
    );
  });

const ReviewFormDisplay = ({ form, user, tradeId, specificReview, postReviewRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        postReviewRequest({ ...values, tradeId });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} hideRequiredMark colon={false} className="review-form">
      <Form.Item
        label={
          <span>
            Please make sure to rate this trade with <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>
          </span>
        }
      >
        {form.getFieldDecorator('titleEnum', {
          rules: [{ required: true, message: <div>Please select one!</div> }],
          initialValue: specificReview ? specificReview.titleEnum : likesKeys[0],
        })(
          <Select
            className="review-form__displayed"
            dropdownClassName="review-form__dropdown"
            disabled={!!specificReview}
          >
            {renderOptions()}
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="You can add a comment">
        {form.getFieldDecorator('message', {
          rules: [{ max: 350, message: <div>Max. 500 characters</div> }],
          initialValue: specificReview ? specificReview.message : undefined,
        })(<Input.TextArea rows={4} placeholder="No comments..." disabled={!!specificReview} />)}
      </Form.Item>
      {!specificReview ? (
        <Button
          className="primary-btn"
          type="primary"
          htmlType="submit"
          disabled={!!specificReview}
          style={{ marginTop: 16 }}
        >
          Submit
        </Button>
      ) : (
        <ExclamationMessage>Thanks for your review!</ExclamationMessage>
      )}
    </Form>
  );
};

export default Form.create({ name: 'reviewForm' })(ReviewFormDisplay);
