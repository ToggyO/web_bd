import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Spin } from 'antd';
import { Link } from 'react-router-dom';

import { BackLink } from './_components/BackLink';
import { TradeHeader } from './_components/TradeHeader';
import { Chat } from './_components/Chat';
import { TradingActions } from './_components/TradingActions';
import { ReviewContainer } from './_components/Review';
import { MiniActions } from './_components/MiniActions';
import { TradeDetails } from './_components/TradeDetails';
import { determineUserInHeader, determineUserRoles, determineReviewable } from './_utils';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { Spinner } from '@components/Spinner';

import { ROUTES } from '@config/constants';
import history from '@services/history';
import { catchFromPath } from '@utils';

import './style.less';

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

  const { direction, tradePartner, adOwner, adType, status, currency, fiat } = specificTrade;

  const user = determineUserInHeader(direction, tradePartner, adOwner);
  const [action, me, other] = determineUserRoles(direction, adType);
  const isReviewable = determineReviewable(status, currency, fiat);

  return (
    <HelmetWrapper title={`Trade #${id} - Bitcoins Direct`} description={`Trade #${id} - Bitcoins Direct`}>
      <div className="paper paper--white">
        <div className="trade">
          <BackLink tradeStatus={specificTrade.status} />

          <Spin spinning={loading} indicator={<span />}>
            <TradeHeader id={id} action={action} user={user} />
          </Spin>

          <Row gutter={34} type="flex">
            {/* Left column with chat and payload for current trade status */}
            <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 2 }}>
              <Chat
                me={me}
                other={other}
                specificChat={specificChat}
                chatLoading={chatLoading}
                order={specificTrade.order}
              />

              <TradingActions
                user={user}
                me={me}
                specificTrade={specificTrade}
                fiatSentRequest={fiatSentRequest}
                fiatReceivedRequest={fiatReceivedRequest}
                submitting={submitting}
              />

              {isReviewable && <ReviewContainer user={user} order={id} tradeId={specificTrade.id} />}
            </Col>

            {/* Right column with buttons and Trade details */}
            <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 1 }}>
              <Spin spinning={loading} indicator={<Spinner />}>
                <p>
                  You can close the trade window while waiting for a reply. You will receive an Email alert
                  and notification when the seller reply. You can open the window of this trade from you
                  <Link to={ROUTES.DASHBOARD.ROOT}> dashboard</Link>.
                </p>

                <MiniActions
                  specificTrade={specificTrade}
                  loading={loading}
                  deleteNewTradeRequest={deleteNewTradeRequest}
                  getTradeByIdRequest={getTradeByIdRequest}
                />

                <Divider />

                <TradeDetails specificTrade={specificTrade} />
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    </HelmetWrapper>
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
