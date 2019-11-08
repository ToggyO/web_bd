import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Spin, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

import { WalletAddressFormContainer } from './WalletAddressForm';
import { TradeDetails } from './TradeDetails';

import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { Spinner } from '@components/Spinner';
import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { Refresher } from '@components/Refresher';
import { ROUTES, confirmData } from '@config/constants';
import { InitiateDisputeLinkWithModal } from '@scenes/_components/InitiateDisputeLinkWithModal';
import history from '@services/history';

import { catchFromPath } from '@utils';
import './style.less';

const TalkJS = loadable(() => import('./Talk'));

const TradeDisplay = ({
  getTradeByIdRequest,
  getChatByIdRequest,
  fiatSentRequest,
  fiatReceivedRequest,
  deleteNewTradeRequest,
  loading,
  specificTrade,
  chatLoading,
  specificChat,
  submitting,
}) => {
  const id = catchFromPath(history.location.pathname, 'trades');

  useEffect(() => {
    getTradeByIdRequest(id);
    getChatByIdRequest(id);
  }, []);

  let action;
  let me;
  let other;

  const user = specificTrade.direction === 'Incoming' ? specificTrade.tradePartner : specificTrade.adOwner;

  const isMobile = window.matchMedia('(max-width: 813px)').matches;

  switch (specificTrade.adType) {
    case 'Sell': {
      if (specificTrade.direction === 'Outgoing') {
        action = 'Buy bitcoins from ';
        me = 'buyer';
        other = 'seller';
      }
      if (specificTrade.direction === 'Incoming') {
        action = 'Sell bitcoins to ';
        me = 'seller';
        other = 'buyer';
      }
      break;
    }

    case 'Buy': {
      if (specificTrade.direction === 'Incoming') {
        action = 'Buy bitcoins from ';
        me = 'buyer';
        other = 'seller';
      }
      if (specificTrade.direction === 'Outgoing') {
        action = 'Sell bitcoins to ';
        me = 'seller';
        other = 'buyer';
      }
      break;
    }

    default:
      action = '';
  }
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="trade">
          {/* Back arrow with corresponding text */}
          {(() => {
            switch (specificTrade.status) {
              case 'New':
                return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.REQUESTS} />;
              case 'Depositing':
              case 'InProgress':
              case 'FiatSent':
              case 'Disputed':
                return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ACTIVE} />;
              case 'Completed':
              case 'ResolvedToBuyer':
              case 'ResolvedToSeller':
                return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.COMPLETED} />;
              default:
                return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ROOT} />;
            }
          })()}
          <Spin spinning={loading} indicator={<span />}>
            <h2>
              #{id} {action}
              <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>
            </h2>
          </Spin>

          <Row gutter={34}>
            {/* Left column with chat and payload for current trade status */}
            <Col md={12}>
              <div className="chat">
                {isMobile ? (
                  <TalkJS
                    _me={specificChat[me]}
                    _other={specificChat[other]}
                    _id={specificChat.id}
                    _order={`${specificTrade.order}`}
                    isMobile={isMobile}
                  />
                ) : (
                  <div className="chat__window">
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
                        _order={`${specificTrade.order}`}
                        isMobile={isMobile}
                      />
                    )}
                  </div>
                )}

                {(() => {
                  switch (specificTrade.status) {
                    case 'New':
                      // First step for case where adType === 'Sell'
                      if (me === 'buyer' && specificTrade[`${me}Wallet`]) {
                        return (
                          <ExclamationMessage>
                            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> confirm
                            trading.
                          </ExclamationMessage>
                        );
                      }
                      if (me === 'seller' && !specificTrade[`${me}Wallet`]) {
                        return (
                          <>
                            <p>
                              To confirm you are willing to trade with{' '}
                              <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> enter receiving Bitcoin
                              wallet public address. BTC will be transferred to this address if trade is
                              canceled or you win a dispute.
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
                              To confirm you are willing to trade with{' '}
                              <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> enter receiving Bitcoin
                              wallet public address. BTC will be transferred to this address if trade is
                              canceled or you win a dispute.
                            </p>
                            <WalletAddressFormContainer id={specificTrade.id} />
                          </>
                        );
                      }
                      if (specificTrade.adType === 'Buy' && me === 'seller' && specificTrade[`${me}Wallet`]) {
                        return (
                          <ExclamationMessage>
                            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> confirm
                            trading.
                          </ExclamationMessage>
                        );
                      }
                      break;

                    case 'Depositing':
                      if (me === 'buyer') {
                        return (
                          <ExclamationMessage>
                            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to deposit
                            funds to Escrow.
                          </ExclamationMessage>
                        );
                      }
                      if (me === 'seller') {
                        return (
                          <>
                            <ExclamationMessage>
                              This is Escrow multisig wallet address, please transfer {specificTrade.amount}{' '}
                              BTC. Note it may take a while for the funds to arrive.
                            </ExclamationMessage>
                            <div
                              className="initiate-trade__fake-message"
                              style={{ wordBreak: 'break-all', height: 42 }}
                            >
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
                              BTC were successfully deposited to Escrow. It is safe now to proceed with the
                              payment. Confirm you’ve sent fiat to{' '}
                              <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
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
                                        Confirm you have sent fiat to{' '}
                                        <span style={{ color: '#2EAC82' }}>{user}</span>?
                                      </div>
                                    ),
                                  },
                                  {
                                    okText: 'Yes',
                                    cancelText: 'No',
                                  }
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
                            <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to confirm sending the
                            fiat.
                          </ExclamationMessage>
                        );
                      }
                      break;

                    case 'FiatSent':
                      if (me === 'buyer') {
                        return (
                          <ExclamationMessage>
                            Waiting for <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link> to confirm
                            receiving the fiat.
                          </ExclamationMessage>
                        );
                      }
                      if (me === 'seller') {
                        return (
                          <>
                            <ExclamationMessage>
                              Confirm you’ve received fiat from{' '}
                              <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
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
                                        Confirm you have received fiat from{' '}
                                        <span style={{ color: '#2EAC82' }}>{user}</span>?
                                      </div>
                                    ),
                                  },
                                  {
                                    okText: 'Yes',
                                    cancelText: 'No',
                                  }
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
                            Escrow has released the funds to your wallet address. You can check transaction
                            status on <a href="https://blockchain.info">blockchain.info</a>
                          </ExclamationMessage>
                        );
                      }

                      if (me === 'seller') {
                        return (
                          <ExclamationMessage>
                            Escrow has released the funds to{' '}
                            <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>.
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
                })()}
              </div>
            </Col>

            {/* Right column with buttons and Trade details */}
            <Col md={12}>
              <Spin spinning={loading} indicator={<Spinner />}>
                <p>
                  You can close the trade window while waiting for a reply. You will receive an Email alert
                  and notification when the seller reply. You can open the window of this trade from you
                  <Link to={ROUTES.DASHBOARD.ROOT}> dashboard</Link>.
                </p>

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
                              { ...confirmData.requests.buttons }
                            )
                          }
                        >
                          Decline request
                        </ButtonLink>
                      );

                    // case 'InProgress':
                    //   return (
                    //     <ButtonLink
                    //       onClick={() =>
                    //         ShowConfirm(
                    //           specificTrade.id,
                    //           cancelTradeRequest,
                    //           { ...confirmData.active.texts },
                    //           { ...confirmData.active.buttons }
                    //         )
                    //       }
                    //     >
                    //       Cancel trade
                    //     </ButtonLink>
                    //   );
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
                    cb={() => getTradeByIdRequest(id)}
                  />
                ) : null}

                <Divider />

                <TradeDetails specificTrade={specificTrade} />
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

TradeDisplay.propTypes = {
  loading: PropTypes.bool,
  specificTrade: PropTypes.shape({
    id: PropTypes.string,
    order: PropTypes.number,
    amount: PropTypes.number,
    fiat: PropTypes.number,
    tradePartner: PropTypes.string,
    adOwner: PropTypes.string,
    btcPrice: PropTypes.number,
    payment: PropTypes.string,
    status: PropTypes.string,
    minTradeLimit: PropTypes.number,
    maxTradeLimit: PropTypes.number,
    currency: PropTypes.string,
    location: PropTypes.string,
    terms: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    adType: PropTypes.string,
    direction: PropTypes.string,
    multisigWalletAddress: PropTypes.string,
  }),
  chatLoading: PropTypes.bool,
  specificChat: PropTypes.shape({
    id: PropTypes.string,
    buyer: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  getTradeByIdRequest: PropTypes.func,
  getChatByIdRequest: PropTypes.func,
  fiatSentRequest: PropTypes.func,
  fiatReceivedRequest: PropTypes.func,
  deleteNewTradeRequest: PropTypes.func,
  submitting: PropTypes.bool,
};

TradeDisplay.defaultProps = {
  loading: true,
  specificTrade: {
    currency: '',
    adType: 'Sell',
  },

  submitting: false,
};

export default TradeDisplay;
