import { connect } from 'react-redux';

import QuickFilterFormDisplay from './QuickFilterFormDisplay';

import { searchActions, searchSelectors } from '@ducks/ads';

function mapStateToProps(state) {
  return {
    amount: searchSelectors.amountSelector(state),
    payment: searchSelectors.paymentSelector(state),
    location: searchSelectors.locationSelector(state),
    currency: searchSelectors.currencySelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    filterDataSubmit(formValues) {
      dispatch(searchActions.filterDataSubmit(formValues));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuickFilterFormDisplay);
