/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Collapse, Icon } from 'antd';
import './style.less';

const { Panel } = Collapse;

export const Collapsed = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleChange = () => {
    setCollapsed(prevValue => !prevValue);
  };

  return (
    <>
      <Collapse
        onChange={handleChange}
        className="collapse"
        expandIcon={({ isActive }) => <Icon type="down" rotate={isActive ? -180 : 0} />}
      >
        <Panel
          header={<span className="collapse__header">{collapsed ? 'Show filters' : 'Hide filters'}</span>}
        >
          {children}
        </Panel>
      </Collapse>
      {React.cloneElement(children, { classNames: 'uncollapse' })}
    </>
  );
};
