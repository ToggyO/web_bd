import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';
import history from '@services/history';
import superaxios from '@services/superaxios';
import image from './image';
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
    <>
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
        <p style={{ marginBottom: 0, fontSize: 10 }}>Front-End 0.0.7f</p>
        <p style={{ marginBottom: 0, fontSize: 10 }}>Back-End {version}</p>
      </div>
    </>
  );
};
