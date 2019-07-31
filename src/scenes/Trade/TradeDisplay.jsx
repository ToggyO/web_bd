/* eslint-disable no-void */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { Spinner } from '@components/Spinner';
import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { ROUTES, confirmData } from '@config/constants';
import { InitiateDisputeLinkWithModal } from '@scenes/_components/InitiateDisputeLinkWithModal';
import { WalletAddressFormContainer } from './WalletAddressForm';
import { catchFromPath, prettifyId, formatMoney, formatCapitals } from '@utils';
import './style.less';

const TradeDisplay = ({
  getTradeByIdRequest,
  fiatSentRequest,
  fiatReceivedRequest,
  cancelTradeRequest,
  specificTrade,
  loading,
  submitting,
}) => {
  const id = catchFromPath(history.location.pathname, 'trades');
  useEffect(() => {
    getTradeByIdRequest(id);
  }, []);

  let action;
  let you;

  const user = specificTrade.direction === 'Incoming' ? specificTrade.tradePartner : specificTrade.adOwner;

  switch (specificTrade.adType) {
    case 'Sell': {
      if (specificTrade.direction === 'Outgoing') {
        action = 'Buy bitcoins from ';
        you = 'buyer';
      }
      if (specificTrade.direction === 'Incoming') {
        action = 'Sell bitcoins to ';
        you = 'seller';
      }
      break;
    }

    case 'Buy': {
      if (specificTrade.direction === 'Incoming') {
        action = 'Buy bitcoins from ';
        you = 'buyer';
      }
      if (specificTrade.direction === 'Outgoing') {
        action = 'Sell bitcoins to ';
        you = 'seller';
      }
      break;
    }

    default:
      action = '';
  }

  return (
    <AppWrapperContainer>
      <div className="paper">
        <Spin spinning={loading} indicator={<Spinner />}>
          <div className="trade">
            {(() => {
              switch (specificTrade.status) {
                case 'New':
                  return (
                    <ArrowLink text="Back to trade requests" leftArrow goTo={ROUTES.DASHBOARD.REQUESTS} />
                  );
                case 'Depositing':
                case 'InProgress':
                case 'FiatSent':
                  return <ArrowLink text="Back to active trades" leftArrow goTo={ROUTES.DASHBOARD.ACTIVE} />;
                case 'Completed':
                  return (
                    <ArrowLink text="Back to completed trades" leftArrow goTo={ROUTES.DASHBOARD.COMPLETED} />
                  );
                default:
                  return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ROOT} />;
              }
            })()}

            <h2>
              #{prettifyId(id)} {action}
              <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>
            </h2>
            <Row gutter={34}>
              <Col md={12}>
                <div className="chat">
                  <div className="chat__window">Chat</div>

                  {(() => {
                    switch (specificTrade.status) {
                      case 'New':
                        // First step for case where adType === 'Sell'
                        if (you === 'buyer' && specificTrade[`${you}Wallet`]) {
                          return (
                            <ExclamationMessage>
                              Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> confirm
                              trading.
                            </ExclamationMessage>
                          );
                        }
                        if (you === 'seller' && !specificTrade[`${you}Wallet`]) {
                          return (
                            <>
                              <p>
                                To confirm you are willing to trade with{' '}
                                <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> enter receiving Bitcoin
                                wallet public address. BTC will be transferred to this address if trade is
                                cancelled or you win a dispute.
                              </p>
                              <WalletAddressFormContainer />
                            </>
                          );
                        }

                        // First step for case where adType === 'Buy'
                        if (
                          specificTrade.adType === 'Buy' &&
                          you === 'buyer' &&
                          !specificTrade[`${you}Wallet`]
                        ) {
                          return (
                            <>
                              <p>
                                To confirm you are willing to trade with{' '}
                                <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> enter receiving Bitcoin
                                wallet public address. BTC will be transferred to this address if trade is
                                cancelled or you win a dispute.
                              </p>
                              <WalletAddressFormContainer />
                            </>
                          );
                        }
                        if (
                          specificTrade.adType === 'Buy' &&
                          you === 'seller' &&
                          specificTrade[`${you}Wallet`]
                        ) {
                          return (
                            <ExclamationMessage>
                              Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> confirm
                              trading.
                            </ExclamationMessage>
                          );
                        }
                        break;

                      case 'Depositing':
                        if (you === 'buyer') {
                          return (
                            <ExclamationMessage>
                              Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to deposit
                              funds to Escrow.
                            </ExclamationMessage>
                          );
                        }
                        if (you === 'seller') {
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
                        if (you === 'buyer') {
                          return (
                            <>
                              <ExclamationMessage>
                                BTC were successfully deposited to Escrow. It is safe now to proceed with the
                                payment. Confirm you’ve sent fiat to{' '}
                                <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                              </ExclamationMessage>
                              <Button
                                loading={submitting}
                                type="primary"
                                style={{ padding: '0 24px' }}
                                onClick={() =>
                                  ShowConfirm(
                                    id,
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

                        if (you === 'seller') {
                          return (
                            <ExclamationMessage>
                              BTC were successfully deposited to Escrow. Waiting for{' '}
                              <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to confirm sending the
                              fiat.
                            </ExclamationMessage>
                          );
                        }
                        break;

                      case 'FiatSent':
                        if (you === 'buyer') {
                          return (
                            <ExclamationMessage>
                              Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to confirm
                              receiving the fiat.
                            </ExclamationMessage>
                          );
                        }
                        if (you === 'seller') {
                          return (
                            <>
                              <ExclamationMessage>
                                Confirm you’ve received fiat from{' '}
                                <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                              </ExclamationMessage>
                              <Button
                                loading={submitting}
                                type="primary"
                                style={{ padding: '0 24px' }}
                                onClick={() =>
                                  ShowConfirm(
                                    id,
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
                        if (you === 'buyer') {
                          return (
                            <ExclamationMessage>
                              Escrow has released the funds to your wallet address. You can check transaction
                              status on <a href="https://blockchain.info">blockchain.info</a>
                            </ExclamationMessage>
                          );
                        }

                        if (you === 'seller') {
                          return (
                            <ExclamationMessage>
                              Escrow has released the funds to{' '}
                              <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                            </ExclamationMessage>
                          );
                        }

                        break;

                      case 'Cancelled':
                        return <ExclamationMessage>This trade has been canceled.</ExclamationMessage>;

                      default:
                        return null;
                    }
                    return void 0;
                  })()}
                </div>
              </Col>
              <Col md={12}>
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
                              cancelTradeRequest,
                              { ...confirmData.requests.texts },
                              { ...confirmData.requests.buttons }
                            )
                          }
                        >
                          Decline request
                        </ButtonLink>
                      );

                    case 'Depositing':
                    case 'InProgress':
                      return (
                        <ButtonLink
                          onClick={() =>
                            ShowConfirm(
                              specificTrade.id,
                              cancelTradeRequest,
                              { ...confirmData.active.texts },
                              { ...confirmData.active.buttons }
                            )
                          }
                        >
                          Cancel trade
                        </ButtonLink>
                      );

                    case 'FiatSent':
                      return <InitiateDisputeLinkWithModal id={specificTrade.id}/>;
                    default:
                      return null;
                  }
                })()}

                <Divider />
                <Row>
                  <Col xs={12}>
                    <span className="span-head">Trade amount</span>
                    <p>{specificTrade.amount} BTC</p>
                  </Col>
                  <Col xs={12}>
                    <span className="span-head">Fiat</span>
                    <p>
                      {formatMoney(specificTrade.fiat)} {specificTrade.currency}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="span-head">Trade status</span>
                    <p className="green-status">{formatCapitals(specificTrade.status)}</p>
                  </Col>
                  <Col xs={12}>
                    <span className="span-head">Ad owner</span>
                    <p>
                      <Link to={`${ROUTES.USER.ROOT}/${specificTrade.adOwner}`}>{specificTrade.adOwner}</Link>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="span-head">Price/BTC</span>
                    <p>
                      {formatMoney(specificTrade.btcPrice)} {specificTrade.currency}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <span className="span-head">Payment method</span>
                    <p>{specificTrade.payment}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="span-head">Trade limits</span>
                    <p>
                      {`${formatMoney(specificTrade.minTradeLimit)} - ${formatMoney(
                        specificTrade.maxTradeLimit
                      )} `}{' '}
                      {specificTrade.currency}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <span className="span-head">Location</span>
                    <p>{specificTrade.location}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="span-head">Terms of trade</span>
                    <p>{specificTrade.terms}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    </AppWrapperContainer>
  );
};

TradeDisplay.propTypes = {
  specificTrade: PropTypes.shape({
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
    terms: PropTypes.string,
    adType: PropTypes.string,
    direction: PropTypes.string,
    multisigWalletAddress: PropTypes.string,
  }),
  getTradeByIdRequest: PropTypes.func,
  fiatSentRequest: PropTypes.func,
  fiatReceivedRequest: PropTypes.func,
  cancelTradeRequest: PropTypes.func,
  loading: PropTypes.bool,
  submitting: PropTypes.bool,
};

TradeDisplay.defaultProps = {
  specificTrade: {
    currency: '',
    adType: 'Sell',
  },
  loading: true,
  submitting: false,
};

export default TradeDisplay;
