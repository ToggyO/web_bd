import React from 'react';
import { Icon } from 'antd';

export const likes = {
  Best: {
    isLike: true,
    title: 'It was a good deal',
    icon: <Icon type="like" className="green-status" />,
  },
  Good: {
    isLike: true,
    title: 'It\'s not a bad deal',
    icon: <Icon type="like" className="green-status" />,
  },
  Bad: {
    isLike: false,
    title: 'I didn\'t like it',
    icon: <Icon type="dislike" className="red-status" />,
  },
  Worst: {
    isLike: false,
    title: 'It went horribly',
    icon: <Icon type="dislike" className="red-status" />,
  },
};
