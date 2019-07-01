import { connect } from 'react-redux';
import { searchParamsActions, searchParamsSelectors } from '@ducks/trades/searchParams';
import QuickFilterFormDisplay from './QuickFilterFormDisplay';

function mapStateToProps(state) {
  return {
    amount: searchParamsSelectors.amountSelector(state),
    payment: searchParamsSelectors.paymentSelector(state),
    location: searchParamsSelectors.locationSelector(state),
    currency: searchParamsSelectors.currencySelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    filterDataSubmit(formValues) {
      dispatch(searchParamsActions.filterDataSubmit(formValues));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickFilterFormDisplay);
