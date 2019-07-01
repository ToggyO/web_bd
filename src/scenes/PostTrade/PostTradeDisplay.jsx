import React from 'react';
import PropTypes from 'prop-types';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { CreateEditTradeFormContainer } from '../_components/CreateEditTradeForm';
import './style.less';

const PostTradeDisplay = ({ isAuthorized, specificTrade, postTradeRequest, persistFormState }) => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="post-trade">
        <h1>Post a trade</h1>
        <CreateEditTradeFormContainer
          onSubmit={isAuthorized ? postTradeRequest : persistFormState}
          specificTrade={specificTrade}
        />
      </div>
    </div>
  </AppWrapperContainer>
);

PostTradeDisplay.propTypes = {
  isAuthorized: PropTypes.bool,
  specificTrade: PropTypes.object,
  postTradeRequest: PropTypes.func,
  persistFormState: PropTypes.func,
};

PostTradeDisplay.defaultProps = {
  specificTrade: {},
};

export default PostTradeDisplay;
