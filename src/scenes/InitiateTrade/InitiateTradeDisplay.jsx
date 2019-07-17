import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { Row, Col } from 'antd';
import { Spinner } from '@components/Spinner';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { InitiateTradeFormContainer } from './InitiateTradeForm';
import './style.less';
import { catchFromPath } from '@utils';

const InitiateTradeDisplay = ({ getAdByIdRequest, specificTrade, loading, cachedUserName }) => {
  const tradeId = catchFromPath(history.location.pathname, 'ads');
  useEffect(() => {
    getAdByIdRequest(tradeId);
  }, []);

  const {
    btcPrice,
    currency,
    payment,
    location,
    terms,
    minTransactionLimit,
    maxTransactionLimit,
    userName,
  } = specificTrade;
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="initiate-trade">
          <h2 className="initiate-trade__header">Buy bitcoins from {userName}</h2>
          <span className="initiate-trade__label">How much do you want to buy?</span>
          <Row gutter={{ sm: 12, lg: 48 }}>
            <Col lg={11}>
              <InitiateTradeFormContainer
                tradeId={tradeId}
                min={minTransactionLimit}
                max={maxTransactionLimit}
                currency={currency}
                userName={userName}
                cachedUserName={cachedUserName}
                loading={loading}
              />
            </Col>
            <Col lg={13}>
              <Spinner spinning={loading}>
                <>
                  <Row gutter={{ sm: 12, lg: 48 }}>
                    <Col xs={12}>
                      <span style={{ fontWeight: 500 }}>Price / BTC</span>
                      <p>
                        {btcPrice} {currency}
                      </p>
                    </Col>
                    <Col xs={12}>
                      <span style={{ fontWeight: 500 }}>Payment method</span>
                      <p>{payment}</p>
                    </Col>
                  </Row>
                  <Row gutter={{ sm: 12, lg: 48 }}>
                    <Col xs={12}>
                      <span style={{ fontWeight: 500 }}>Seller</span>
                      <p>
                        <Link to={`/user/${userName}`}>{userName}</Link>
                      </p>
                    </Col>
                    <Col xs={12}>
                      <span style={{ fontWeight: 500 }}>Trade limits</span>
                      <p>{`${minTransactionLimit} - ${maxTransactionLimit} ${currency}`}</p>
                    </Col>
                  </Row>
                  <Row gutter={48}>
                    <Col>
                      <span style={{ fontWeight: 500 }}>Location</span>
                      <p>{location}</p>
                    </Col>
                  </Row>
                  <Row gutter={48}>
                    <Col>
                      <span style={{ fontWeight: 500 }}>Terms of trade</span>
                      <p>{terms}</p>
                    </Col>
                  </Row>
                </>
              </Spinner>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

InitiateTradeDisplay.propTypes = {
  getAdByIdRequest: PropTypes.func,
  specificTrade: PropTypes.object,
  loading: PropTypes.bool,
  cachedUserName: PropTypes.string,
};
InitiateTradeDisplay.defaultProps = {
  loading: false,
  cachedUserName: null,
};

export default InitiateTradeDisplay;
