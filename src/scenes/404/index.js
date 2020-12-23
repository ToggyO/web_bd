import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';

import image from './image';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import history from '@services/history';
import superaxios from '@services/superaxios';
import { APP_NAME } from '@config';
import './style.less';

export const NotFound = () => {
  const [version, setVersion] = useState('');
  const getVersion = async () => {
    const { data } = await superaxios.get('/version');
    setVersion(() => data.data);
  };
  useEffect(() => {
    getVersion();
  }, []);

  return (
    <HelmetWrapper title={`404 - ${APP_NAME}`} description="Page not found">
      <Result
        className="not-found"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        icon={image()}
        extra={
          <Button type="primary" onClick={() => history.goBack()}>
            Go Back
          </Button>
        }
      />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <p style={{ marginBottom: 0, fontSize: 9, color: '#ccc' }}>F 0.1.8</p>
        <p style={{ marginBottom: 0, fontSize: 9, color: '#ccc' }}>B {version}</p>
      </div>
    </HelmetWrapper>
  );
};
