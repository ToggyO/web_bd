/* eslint-disable react/prop-types */
import React from 'react';

import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';
import { Refresher } from '@components/Refresher';
import { InitiateDisputeLinkWithModal } from '@scenes/_components/InitiateDisputeLinkWithModal';

import { confirmData } from '@config';

export const MiniActions = ({ specificTrade, loading, deleteNewTradeRequest, getTradeByIdRequest }) => (
  <div>
    {(() => {
      switch (specificTrade.status) {
        case 'New':
          return (
            <ButtonLink
              onClick={() =>
                ShowConfirm(
                  specificTrade.id,
                  deleteNewTradeRequest,
                  { ...confirmData.requests.texts },
                  { ...confirmData.requests.buttons },
                )
              }
            >
              Decline request
            </ButtonLink>
          );

        case 'Depositing':
        case 'InProgress':
        case 'FiatSent':
          return <InitiateDisputeLinkWithModal id={specificTrade.id} />;
        default:
          return null;
      }
    })()}
    {specificTrade.status !== 'Completed' ? (
      <Refresher
        style={{ position: 'relative', top: 1 }}
        loading={loading}
        cb={() => getTradeByIdRequest(specificTrade.id)}
      />
    ) : null}
  </div>
);
