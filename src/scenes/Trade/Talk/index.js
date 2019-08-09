/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Icon } from 'antd';
import Talk from 'talkjs';
import photoUrl from '@assets/photoUrl.png';

const TalkJS = ({ _me, _other, _id, _order }) => {
  let chatbox;
  let container = useRef(null);

  useEffect(() => {
    Talk.ready
      .then(() => {
        const me = new Talk.User({ ..._me, role: 'bitcoins_direct_user' });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tL9PLRIs',
            me,
          });
        }

        const other = new Talk.User({ ..._other, photoUrl });

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.

        const conversation = window.talkSession.getOrCreateConversation(_id);
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        conversation.setAttributes({
          subject: `Trade #${_order}`,
          custom: { order: _order },
        });

        //         var chatbox = talkSession.createChatbox(conversation);
        // chatbox.mount(document.getElementById("talkjs-container"));

        chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(container);
      })
      .catch(e => {
        chatbox.mount(<p>Lol</p>);
      });

    return () => {
      if (chatbox) {
        chatbox.destroy();
      }
    };
  }, [_me]);

  return (
    <span>
      <div
        style={{ height: '100%', position: 'relative' }}
        ref={c => {
          container = c;
        }}
      >
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Icon type="loading" style={{ fontSize: 25 }} />
        </p>
      </div>
    </span>
  );
};

export default TalkJS;
