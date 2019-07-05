import React from 'react';
import { Result, Button } from 'antd';
import history from '@services/history';
import image from './image';

export const NotFound = () => (
  <Result
    style={{ height: '100vh', background: '#F0F4F3' }}
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    icon={image()}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);
