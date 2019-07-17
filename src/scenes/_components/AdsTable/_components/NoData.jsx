import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import { ROUTES } from '@config/constants';

export const NoData = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={
      <>
        <span style={{ display: 'block' }}>No results for your query</span>
        <Link to={ROUTES.HOME}>Go back</Link> or <Link to={ROUTES.ADS.CREATE}>create your own</Link>
      </>
    }
  />
);
