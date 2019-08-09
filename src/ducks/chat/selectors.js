import { createSelector } from 'reselect';

export const chatSelector = createSelector(
  state => state.chat.data,
  data => ({
    id: data.id,
    buyer: {
      id: data.buyer.user.userName,
      name: data.buyer.user.userName,
      email: data.buyer.user.email,
    },
    seller: {
      id: data.seller.user.userName,
      name: data.seller.user.userName,
      email: data.seller.user.email,
    },
  })
);

export const chatLoadingSelector = createSelector(
  state => state.chat.loading,
  loading => loading
);
