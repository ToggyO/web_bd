/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { WalletAddressFormContainer } from './WalletAddressForm';

import { ExclamationMessage } from '@components/ExclamationMessage';
import { ShowConfirm } from '@components/ShowConfirm';

import { ROUTES } from '@config';

export const TradingActions = ({
  user,
  me,
  specificTrade,
  fiatSentRequest,
  fiatReceivedRequest,
  submitting,
}) => {
  switch (specificTrade.status) {
    case 'New':
      // First step for case where adType === 'Sell'
      if (me === 'buyer' && specificTrade[`${me}Wallet`]) {
        return (
          <ExclamationMessage>
            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> confirm trading.
          </ExclamationMessage>
        );
      }
      if (me === 'seller' && !specificTrade[`${me}Wallet`]) {
        return (
          <>
            <p>
              To confirm you are willing to trade with <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>{' '}
              enter receiving Bitcoin wallet public address. BTC will be transferred to this address if trade
              is canceled or you win a dispute.
            </p>
            <WalletAddressFormContainer id={specificTrade.id} />
          </>
        );
      }

      // First step for case where adType === 'Buy'
      if (specificTrade.adType === 'Buy' && me === 'buyer' && !specificTrade[`${me}Wallet`]) {
        return (
          <>
            <p>
              To confirm you are willing to trade with <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>{' '}
              enter receiving Bitcoin wallet public address. BTC will be transferred to this address if trade
              is canceled or you win a dispute.
            </p>
            <WalletAddressFormContainer id={specificTrade.id} />
          </>
        );
      }
      if (specificTrade.adType === 'Buy' && me === 'seller' && specificTrade[`${me}Wallet`]) {
        return (
          <ExclamationMessage>
            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> confirm trading.
          </ExclamationMessage>
        );
      }
      break;

    case 'Depositing':
      if (me === 'buyer') {
        return (
          <ExclamationMessage>
            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to deposit funds to Escrow.
          </ExclamationMessage>
        );
      }
      if (me === 'seller') {
        return (
          <>
            <ExclamationMessage>
              This is Escrow multisig wallet address, please transfer {specificTrade.amount} BTC. Note it may
              take a while for the funds to arrive.
            </ExclamationMessage>
            <div className="initiate-trade__fake-message" style={{ wordBreak: 'break-all', height: 42 }}>
              {specificTrade.multisigWalletAddress}
            </div>
          </>
        );
      }
      break;

    case 'InProgress':
      if (me === 'buyer') {
        return (
          <>
            <ExclamationMessage>
              BTC were successfully deposited to Escrow. It is safe now to proceed with the payment. Confirm
              you’ve sent fiat to <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
            </ExclamationMessage>
            <Button
              loading={submitting}
              type="primary"
              style={{ padding: '0 24px' }}
              onClick={() =>
                ShowConfirm(
                  specificTrade.id,
                  fiatSentRequest,
                  {
                    title: 'Confirm sending fiat',
                    content: (
                      <div>
                        Confirm you have sent fiat to <span style={{ color: '#2EAC82' }}>{user}</span>?
                      </div>
                    ),
                  },
                  {
                    okText: 'Yes',
                    cancelText: 'No',
                  },
                )
              }
            >
              Fiat sent
            </Button>
          </>
        );
      }

      if (me === 'seller') {
        return (
          <ExclamationMessage>
            BTC were successfully deposited to Escrow. Waiting for{' '}
            <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to confirm sending the fiat.
          </ExclamationMessage>
        );
      }
      break;

    case 'FiatSent':
      if (me === 'buyer') {
        return (
          <ExclamationMessage>
            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to confirm receiving the fiat.
          </ExclamationMessage>
        );
      }
      if (me === 'seller') {
        return (
          <>
            <ExclamationMessage>
              Confirm you’ve received fiat from <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
            </ExclamationMessage>
            <Button
              loading={submitting}
              type="primary"
              style={{ padding: '0 24px' }}
              onClick={() =>
                ShowConfirm(
                  specificTrade.id,
                  fiatReceivedRequest,
                  {
                    title: 'Confirm receiving fiat',
                    content: (
                      <div>
                        Confirm you have received fiat from <span style={{ color: '#2EAC82' }}>{user}</span>?
                      </div>
                    ),
                  },
                  {
                    okText: 'Yes',
                    cancelText: 'No',
                  },
                )
              }
            >
              Fiat received
            </Button>
          </>
        );
      }
      break;

    case 'Completed':
      if (me === 'buyer') {
        return (
          <ExclamationMessage>
            Escrow has released the funds to your wallet address. You can check transaction status on{' '}
            <a href="https://blockchain.info">blockchain.info</a>
          </ExclamationMessage>
        );
      }

      if (me === 'seller') {
        return (
          <ExclamationMessage>
            Escrow has released the funds to <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
          </ExclamationMessage>
        );
      }

      break;

    case 'Canceled':
      return <ExclamationMessage>This trade has been canceled.</ExclamationMessage>;

    default:
      return null;
  }
  return void 0;
};
