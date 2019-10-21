import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card, Button } from 'antd';

import { ButtonLink } from '@components/ButtonLink';
import history from '@services/history';
import { ROUTES } from '@config/constants';
import './style.less';

export const InitiateDisputeLinkWithModal = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const [isDoesntRespondForALongTime, setIsDoesntRespondForALongTime] = useState(false);

  const moveToForm = e => {
    history.push({ pathname: ROUTES.DISPUTES.CREATE, state: { id, text: e.target.innerText } });
  };

  return (
    <>
      <Modal
        title="Initiate a dispute"
        width={290}
        wrapClassName="dispute-modal"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        maskClosable
        footer={false}
      >
        {isDoesntRespondForALongTime ? (
          <>
            <p>
              If you have sent fiat and the seller seems to be offline or doesn’t reply to you - don't panic!
              Note that time difference, transaction timing and unplanned emergency happen to everyone if they
              last for a reasonable amount of time.
            </p>
            <Button
              style={{ height: 30, marginBottom: 10 }}
              block
              type="primary"
              onClick={() => setVisible(false)}
            >
              Wait for some time
            </Button>
            <Button
              style={{ height: 30 }}
              block
              onClick={() =>
                history.push({
                  pathname: ROUTES.DISPUTES.CREATE,
                  state: { id, text: 'I have sent fiat, but seller does not respond for a long time.' },
                })
              }
            >
              Initiate a dispute
            </Button>
          </>
        ) : (
          <>
            <Card hoverable onClick={moveToForm}>
              I have sent fiat, but seller says he didn't get it.
            </Card>
            <Card hoverable onClick={moveToForm}>
              I have sent wrong amount of fiat to the seller.
            </Card>
            <Card hoverable onClick={() => setIsDoesntRespondForALongTime(true)}>
              I have sent fiat, but seller does not respond for a long time.
            </Card>
            <Card hoverable onClick={moveToForm}>
              I have another problem.
            </Card>
          </>
        )}
      </Modal>
      <ButtonLink
        onClick={() => {
          setIsDoesntRespondForALongTime(false);
          setVisible(true);
        }}
      >
        Initiate a dispute
      </ButtonLink>
    </>
  );
};

InitiateDisputeLinkWithModal.propTypes = {
  id: PropTypes.string.isRequired,
};
