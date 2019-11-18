import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Select, Icon, Input, Button, Form } from 'antd';

import { ROUTES } from '@config/constants';
import './style.less';

const { Option } = Select;

const options = [
  { type: 'like1', text: 'It was a good deal', icon: <Icon type="like" className="green-status" /> },
  { type: 'like2', text: "It's not a bad deal", icon: <Icon type="like" className="green-status" /> },
  { type: 'dislike1', text: "I didn't like it", icon: <Icon type="dislike" className="red-status" /> },
  { type: 'dislike2', text: 'It went horribly', icon: <Icon type="dislike" className="red-status" /> },
];

export const Review = Form.create({ name: 'likeForm' })(
  ({ form, isReviewable, user }) =>
    isReviewable && (
      <>
        <Divider style={{ margin: '16px 0' }} />
        <h3>Review</h3>
        <Form hideRequiredMark colon={false}>
          <Form.Item
            label={
              <span>
                Please make sure to rate this trade with{' '}
                <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>
              </span>
            }
          >
            {form.getFieldDecorator('like', {
              rules: [
                { required: true, message: <div>Please select one!</div> },
                { max: 300, message: <div>Max. 300 characters</div> },
              ],
              initialValue: options[0].type,
            })(
              <Select className="review__dropdown" dropdownMenuStyle={{ padding: 0 }}>
                {options.map(option => (
                  <Option value={option.type} key={option.type}>
                    <div className="review__option">
                      <div className="review__icon">{option.icon}</div>
                      <div className="review__text">{option.text}</div>
                    </div>
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Form>
        <p className="review__label" />

        <p className="review__label">You can add a comment</p>
        <Input.TextArea allowClear rows={4} />
        <Button>Submit</Button>
      </>
    ),
);
