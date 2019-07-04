import { connect } from 'react-redux';
import { searchParamsActions, searchParamsSelectors } from '@ducks/trades/searchParams';
import * as tradesSelectors from '@ducks/trades/selectors';
import TradesTableDisplay from './TradesTableDisplay';

function mapStateToProps(state, props) {
  return {
    queryString: searchParamsSelectors.searchQueryStringSelector(state),
    type: props.type,
    tradesData: tradesSelectors.tradesSelector(state, props),
    loading: tradesSelectors.tradeLoadingSelector(state, props),
    totalPages: tradesSelectors.totalPagesQuantitySelector(state, props),
    withTerms: !!props.withTerms,
    classNames: props.classNames,
    field: searchParamsSelectors.fieldSelector(state),
    order: searchParamsSelectors.orderSelector(state),
    page: searchParamsSelectors.pageSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    tablePageChange(page) {
      dispatch(searchParamsActions.tablePageChange(page));
    },
    tableSort(fieldAndDirection) {
      dispatch(searchParamsActions.tableSort(fieldAndDirection));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesTableDisplay);
