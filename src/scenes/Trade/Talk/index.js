/* eslint-disable react/prop-types */
import React from 'react';
import Talk from 'talkjs';

class TalkJS extends React.Component {
  componentDidMount() {
    const { _me, _other } = this.props;
    console.log(this.props);
    Talk.ready
      .then(() => {
        const me = new Talk.User(_me);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tUyS8xpZ',
            me,
          });
        }

        const other = new Talk.User(_other);

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.
        const conversationId = this.props.id;

        const conversation = window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        this.inbox = window.talkSession.createInbox({
          selected: conversation,
        });
        this.inbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

  render() {
    return (
      <span>
        <div
          style={{ height: '500px' }}
          ref={c => {
            this.container = c;
          }}
        >
          Loading...
        </div>
      </span>
    );
  }
}

export default TalkJS;
