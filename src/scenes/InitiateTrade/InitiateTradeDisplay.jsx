import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

import { InitiateTradeFormContainer } from './InitiateTradeForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { Collapsed } from '@scenes/_components/Collapsed';

import { Spinner } from '@components/Spinner';
import history from '@services/history';
import { ROUTES } from '@config';
import { catchFromPath, formatCapitals, catchNewLines } from '@utils';

import './style.less';

const InitiateTradeDisplay = ({ getAdByIdRequest, specificTrade, loading, user }) => {
  const cachedUserID = user.id;
  const adId = catchFromPath(history.location.pathname, 'ads');
  useEffect(() => {
    getAdByIdRequest(adId);
  }, []);

  const {
    id,
    type,
    btcPrice,
    currency,
    payment,
    location,
    terms,
    minTradeLimit,
    maxTradeLimit,
    userName,
    adOwnerID,
  } = specificTrade;
  let header;
  let action;
  let message = ['', ''];

  if (type) {
    if (type.toLowerCase() === 'buy') {
      header = (
        <span>
          Sell bitcoins to <Link to={`${ROUTES.USERS.ROOT}/${userName}`}>{userName}</Link>
        </span>
      );
      action = 'sell';
      message = ['Hi, I\'d like to sell you my', 'for your'];
    }
    if (type.toLowerCase() === 'sell') {
      header = (
        <span>
          Buy bitcoins from <Link to={`${ROUTES.USERS.ROOT}/${userName}`}>{userName}</Link>
        </span>
      );
      action = 'buy';
      message = ['Hi, I\'d like to buy your', 'for my'];
    }
  }
  return (
    <HelmetWrapper title="Request a Trade - Bitcoins Direct" description="Request a Trade">
      <div className="paper paper--white">
        <div className="initiate-trade">
          <h2 className="initiate-trade__header">{header}</h2>
          {loading ? (
            <Skeleton paragraph={false} title={{ width: ['30%'] }} />
          ) : (
            <span className="initiate-trade__label">How much do you want to {action}?</span>
          )}
          <Row gutter={{ sm: 12, lg: 48 }} type="flex">
            <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 2 }}>
              {loading ? (
                <Skeleton
                  paragraph={{
                    rows: 9,
                    width: ['100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%'],
                  }}
                />
              ) : (
                <InitiateTradeFormContainer
                  adId={id}
                  min={minTradeLimit}
                  max={maxTradeLimit}
                  currency={currency || ''}
                  userName={userName}
                  adOwnerID={adOwnerID}
                  cachedUserID={cachedUserID}
                  loading={loading}
                  message={message}
                  btcPrice={btcPrice}
                />
              )}
            </Col>

            <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 1 }}>
              <Collapsed titleWord="trade details" titleFontSize={13}>
                <Spinner spinning={loading}>
                  {loading ? (
                    <Skeleton />
                  ) : (
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
                          <p>{formatCapitals(payment)}</p>
                        </Col>
                      </Row>
                      <Row gutter={{ sm: 12, lg: 48 }}>
                        <Col xs={12}>
                          <span style={{ fontWeight: 500 }}>{type}er</span>
                          <p>
                            <Link to={`${ROUTES.USERS.ROOT}/${userName}`}>{userName}</Link>
                          </p>
                        </Col>
                        <Col xs={12}>
                          <span style={{ fontWeight: 500 }}>Trade limits</span>
                          <p>{`${minTradeLimit} - ${maxTradeLimit} ${currency}`}</p>
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
                          <p>{catchNewLines(terms)}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Spinner>
              </Collapsed>
            </Col>
          </Row>
        </div>
      </div>
    </HelmetWrapper>
  );
};

InitiateTradeDisplay.propTypes = {
  getAdByIdRequest: PropTypes.func,
  specificTrade: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};
InitiateTradeDisplay.defaultProps = {
  loading: false,
};

export default InitiateTradeDisplay;
