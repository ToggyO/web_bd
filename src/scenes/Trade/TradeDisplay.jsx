import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Spin} from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { Spinner } from '@components/Spinner';
import { ButtonLink } from '@components/ButtonLink';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { ROUTES } from '@config/constants';
import { WalletAddressFormContainer } from './WalletAddressForm';
import './style.less';
import { catchFromPath, prettifyId, formatMoney } from '@utils';

const handleClick = () => {
  console.log('clicked');
};

const TradeDisplay = ({ getTradeByIdRequest, specificTrade, loading }) => {
  const id = catchFromPath(history.location.pathname, 'trades');
  useEffect(() => {
    getTradeByIdRequest(id);
  }, []);

  let action;
  const user = specificTrade.direction === 'Incoming' ? specificTrade.tradePartner : specificTrade.adOwner;

  switch (specificTrade.adType) {
    case 'Sell': {
      if (specificTrade.direction === 'Outgoing') {
        action = 'Buy bitcoins from ';
      }
      if (specificTrade.direction === 'Incoming') action = 'Sell bitcoins to ';
      break;
    }

    case 'Buy': {
      if (specificTrade.direction === 'Incoming') action = 'Buy bitcoins from ';
      if (specificTrade.direction === 'Outgoing') action = 'Sell bitcoins to ';
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
                  {(specificTrade.status === 'Pending' && specificTrade.adOwner === localStorage.getItem('userName')) ? (
                    <>
                      <p>Enter receiving Bitcoin wallet public address and confirm you are willing to trade.</p>
                      <WalletAddressFormContainer/>
                    </>
                  ) : (
                    <ExclamationMessage>
                      Waiting for <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link> confirm trading.
                    </ExclamationMessage>
                  )}
                  
                </div>
              </Col>
              <Col md={12}>
                <p>
                  You can close the trade window while waiting for a reply. You will receive an Email alert
                  and notification when the seller reply. You can open the window of this trade from your
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
                    <p className="green-status">{specificTrade.status}</p>
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
  loading: PropTypes.bool,
};

TradeDisplay.defaultProps = {
  specificTrade: {
    currency: '',
    adType: 'Sell',
  },
  loading: true,
};

export default TradeDisplay;
