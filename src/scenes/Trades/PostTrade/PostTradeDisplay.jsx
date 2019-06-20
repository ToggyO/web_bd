import React from 'react';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { CreateEditTradeFormDisplay } from '../_components/CreateEditTradeForm';
import './style.less';

const PostTrade = () => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="post-trade">
        <h1>Post a trade</h1>

        <CreateEditTradeFormDisplay />
      </div>
    </div>
  </AppWrapperContainer>
);

export default PostTrade;
