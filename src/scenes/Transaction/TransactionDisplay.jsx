import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import ArrowLink from '@components/ArrowLink';
import { ButtonLink } from '@components/ButtonLink';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { ROUTES } from '@config/constants';
import './style.less';
import { catchFromPath, prettifyId } from '@utils';

const handleClick = () => {
  console.log('clicked');
};

const TransactionDisplay = () => {
  const id = catchFromPath(history.location.pathname, 'transactions');
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="transaction">
          <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.REQUESTS} />
          <h2>
            {prettifyId(id)} Buy bitcoins from <Link to={`${ROUTES.USER.ROOT}/vit`}>vit</Link>
          </h2>
          <Row gutter={34}>
            <Col md={12}>
              <div className="chat">
                <div className="chat__window">Chat</div>
                <ExclamationMessage>
                  Waiting for <Link to={`${ROUTES.USER.ROOT}/vit`}>vit</Link> confirm trading.
                </ExclamationMessage>
              </div>
            </Col>
            <Col md={12}>
              <p>
                You can close the trade window while waiting for a reply. You will receive an Email alert and
                notification when the seller reply. You can open the window of this transaction from your
                <Link to={ROUTES.DASHBOARD.ROOT}> dashboard</Link>.
              </p>

              <ButtonLink onClick={handleClick}>Cancel trade</ButtonLink>
              <Divider />
              <Row>
                <Col lg={12}>
                  <span className="span-head">Trade amount</span>
                  <p>0.242060 BTC</p>
                </Col>
                <Col lg={12}>
                  <span className="span-head">Fiat</span>
                  <p>2,000.00 USD</p>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <span className="span-head">Trade status</span>
                  <p className="pending">Pending</p>
                </Col>
                <Col lg={12}>
                  <span className="span-head">Seller</span>
                  <p>
                    <Link to={`${ROUTES.USER.ROOT}/vit`}>vit</Link>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <span className="span-head">Price/BTC</span>
                  <p>8,262.62 USD</p>
                </Col>
                <Col lg={12}>
                  <span className="span-head">Payment method</span>
                  <p>Alipay</p>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <span className="span-head">Trade limits</span>
                  <p>2,000 - 11,761 USD</p>
                </Col>
                <Col lg={12}>
                  <span className="span-head">Location</span>
                  <p>USA</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="span-head">Terms of trade</span>
                  <p>
                    Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum
                    te odio zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

export default TransactionDisplay;
