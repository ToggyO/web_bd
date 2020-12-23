/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Collapse, Icon } from 'antd';
import './style.less';

const { Panel } = Collapse;

export const Collapsed = ({ children, titleWord = '', titleFontSize = 15 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleChange = () => {
    setCollapsed(prevValue => !prevValue);
  };

  return (
    <>
      <Collapse
        onChange={handleChange}
        className="collapse-menu"
        expandIcon={({ isActive }) => (
          <Icon
            type="down"
            rotate={isActive ? -180 : 0}
            style={{ fontSize: `${titleFontSize} !important` }}
          />
        )}
      >
        <Panel
          header={
            <span className="collapse-menu__header" style={{ fontSize: titleFontSize }}>
              {collapsed ? `Show ${titleWord}` : `Hide ${titleWord}`}
            </span>
          }
        >
          {children}
        </Panel>
      </Collapse>
      <div className="without-collapse-menu">{React.cloneElement(children)}</div>
    </>
  );
};
