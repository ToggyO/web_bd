import { connect } from 'react-redux';

import AdsTableDisplay from './AdsTableDisplay';

import { searchActions, searchSelectors, adsSelectors } from '@ducks/ads';

function mapStateToProps(state, props) {
  return {
    queryString: searchSelectors.searchQueryStringSelector(state),
    type: props.type,
    adsData: adsSelectors.adsSelector(state, props),
    loading: adsSelectors.adsLoadingSelector(state, props),
    totalPages: adsSelectors.totalPagesQuantitySelector(state, props),
    withTerms: !!props.withTerms,
    classNames: props.classNames,
    field: searchSelectors.fieldSelector(state),
    order: searchSelectors.orderSelector(state),
    page: searchSelectors.pageSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    tablePageChange(page) {
      dispatch(searchActions.tablePageChange(page));
    },
    tableSort(fieldAndDirection) {
      dispatch(searchActions.tableSort(fieldAndDirection));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdsTableDisplay);
