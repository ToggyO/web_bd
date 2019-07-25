import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { Spinner } from '@components/Spinner';
import { ButtonLink } from '@components/ButtonLink';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { ROUTES } from '@config/constants';
import { WalletAddressFormContainer } from './WalletAddressForm';
import { catchFromPath, prettifyId, formatMoney, formatCapitals } from '@utils';
import './style.less';

const handleClick = () => {
  console.log('clicked');
};

const TradeDisplay = ({
  getTradeByIdRequest,
  fiatSentRequest,
  fiatReceivedRequest,
  specificTrade,
  loading,
  submitting,
}) => {
  const id = catchFromPath(history.location.pathname, 'trades');
  useEffect(() => {
    getTradeByIdRequest(id);
  }, []);

  console.log(specificTrade);
  let action;
  let you;
  let other;

  const user = specificTrade.direction === 'Incoming' ? specificTrade.tradePartner : specificTrade.adOwner;

  switch (specificTrade.adType) {
    case 'Sell': {
      if (specificTrade.direction === 'Outgoing') {
        action = 'Buy bitcoins from ';
        you = 'buyer';
        other = 'seller';
      }
      if (specificTrade.direction === 'Incoming') {
        action = 'Sell bitcoins to ';
        you = 'seller';
        other = 'buyer';
      }
      break;
    }

    case 'Buy': {
      if (specificTrade.direction === 'Incoming') {
        action = 'Buy bitcoins from ';
        you = 'buyer';
        other = 'seller';
      }
      if (specificTrade.direction === 'Outgoing') {
        action = 'Sell bitcoins to ';
        you = 'seller';
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
        <Spin spinning={loading} indicator={<Spinner />}>
          <div className="trade">
            <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.REQUESTS} />
            <h2>
              #{prettifyId(id)} {action}
              <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>
            </h2>
            <Row gutter={34}>
              <Col md={12}>
                <div className="chat">
                  <div className="chat__window">Chat</div>

                  {/* FIRST STEP */}
                  {specificTrade.status === 'New' && you === 'buyer' && specificTrade[`${you}Wallet`] && (
                    <ExclamationMessage>
                      Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> confirm trading.
                    </ExclamationMessage>
                  )}

                  {specificTrade.status === 'New' && you === 'seller' && !specificTrade[`${you}Wallet`] && (
                    <>
                      <p>
                        To confirm you are willing to trade with{' '}
                        <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> enter receiving Bitcoin wallet
                        public address. BTC will be transferred to this address if trade is cancelled or you
                        win a dispute.
                      </p>
                      <WalletAddressFormContainer />
                    </>
                  )}

                  {/* SECOND STEP */}
                  {specificTrade.status === 'Pending' && you === 'buyer' && (
                    <ExclamationMessage>
                      Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to deposit funds to
                      Escrow.
                    </ExclamationMessage>
                  )}

                  {specificTrade.status === 'Pending' && you === 'seller' && (
                    <>
                      <ExclamationMessage>
                        This is Escrow multisig wallet address, please transfer {specificTrade.amount} BTC.
                        Note it may take a while for the funds to arrive.
                      </ExclamationMessage>
                      <div className="initiate-trade__fake-message" style={{ wordBreak: 'break-all' }}>
                        KJHKJHFDKJ*&&*&#*&&*#&*#J#^$BDKSFSSDFDSJFH#767242JFJDGH234
                      </div>
                    </>
                  )}

                  {/* THIRD STEP */}
                  {specificTrade.status === 'InProgress' && you === 'buyer' && (
                    <>
                      <ExclamationMessage>
                        BTC were successfully deposited to Escrow. It is safe now to proceed with the payment.
                        Confirm you’ve sent fiat to <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                      </ExclamationMessage>
                      <Button
                        loading={submitting}
                        type="primary"
                        style={{ padding: '0 24px' }}
                        onClick={() => fiatSentRequest(id)}
                      >
                        Fiat sent
                      </Button>
                    </>
                  )}

                  {specificTrade.status === 'InProgress' && you === 'seller' && (
                    <>
                      <ExclamationMessage>
                        BTC were successfully deposited to Escrow. Waiting for{' '}
                        <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to confirm sending the fiat.
                      </ExclamationMessage>
                    </>
                  )}

                  {/* FOURTH STEP, CHANGE STATUS TO FIATSENT */}
                  {specificTrade.status === 'InProgress' && you === 'buyer' && (
                    <>
                      <ExclamationMessage>
                        Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> to confirm
                        receiving the fiat.
                      </ExclamationMessage>
                    </>
                  )}


                  {specificTrade.status === 'InProgress' && you === 'seller' && (
                    <>
                      <ExclamationMessage>
                        Confirm you’ve received fiat from{' '}
                        <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                      </ExclamationMessage>
                      <Button
                        loading={submitting}
                        type="primary"
                        style={{ padding: '0 24px' }}
                        onClick={() => fiatReceivedRequest(id)}
                      >
                        Fiat received
                      </Button>
                    </>
                  )}

                  {/* FIFTH STEP, CHANGE STATUS TO COMPLETED */}
                  {specificTrade.status === 'InProgress' && you === 'buyer' && (
                    <>
                      <ExclamationMessage>
                        Escrow has released the funds to your wallet address. You can check transaction status
                        on <a href="https://blockchain.info">blockchain.info</a>
                      </ExclamationMessage>
                    </>
                  )}

                  {specificTrade.status === 'InProgress' && you === 'seller' && (
                    <>
                      <ExclamationMessage>
                        Escrow has released the funds to{' '}
                        <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>.
                      </ExclamationMessage>
                    </>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <p>
                  You can close the trade window while waiting for a reply. You will receive an Email alert
                  and notification when the seller reply. You can open the window of this trade from you
                  <Link to={ROUTES.DASHBOARD.ROOT}> dashboard</Link>.
                </p>

                <ButtonLink onClick={handleClick}>Cancel trade</ButtonLink>
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
  }),
  getTradeByIdRequest: PropTypes.func,
  fiatSentRequest: PropTypes.func,
  fiatReceivedRequest: PropTypes.func,
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
