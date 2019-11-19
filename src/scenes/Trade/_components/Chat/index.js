/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from 'antd';
import loadable from '@loadable/component';

import './style.less';

const TalkJS = loadable(() => import('./Talk'));

const isMobile = window.matchMedia('(max-width: 813px)').matches;

export const Chat = ({ me, other, specificChat, chatLoading, order }) => (
  <div>
    {isMobile ? (
      <TalkJS
        _me={specificChat[me]}
        _other={specificChat[other]}
        _id={specificChat.id}
        _order={`${order}`}
        isMobile={isMobile}
      />
    ) : (
      <div className="chat">
        {chatLoading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon type="message" style={{ fontSize: 30 }} />
          </div>
        ) : (
          <TalkJS
            _me={specificChat[me]}
            _other={specificChat[other]}
            _id={specificChat.id}
            _order={`${order}`}
            isMobile={isMobile}
          />
        )}
      </div>
    )}
  </div>
);
