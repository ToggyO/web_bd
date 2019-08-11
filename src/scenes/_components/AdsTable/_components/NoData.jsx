import React from 'react';
import { Empty } from 'antd';

export const NoData = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={<span style={{ display: 'block' }}>No results for your query</span>}
  />
);
