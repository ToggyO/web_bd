import React from 'react';

import { Skeleton } from 'antd';

export const TenTradesSkeleton = props => (
  <Skeleton
    {...props}
    active
    title={{ width: ['100%'] }}
    paragraph={{
      rows: 13,
      width: ['100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%'],
    }}
  />
);
