import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import history from '@services/history';
import { formatDate, sortStrings } from '@utils';
import './style.less';

const { Column } = Table;

const CreatedAdsTableDisplay = ({ withTerms, tradesData, loading }) => {
  useEffect(() => {
    if (history.location.state) {
      const tr = document.querySelector(`tr[data-row-key="${history.location.state.id}"]`);
      if (tr) {
        tr.classList.add('hover');
      }
      setTimeout(() => {
        tr.classList.remove('hover');
        history.push({ state: null });
      }, 3000);
    }

    //
  });
  return (
    <div>
      <Table
        // pagination={false}
        expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
        dataSource={tradesData}
        // className={classNames}
        loading={loading}
        // locale={{ emptyText: <NoData /> }}
        expandedRowRender={
          withTerms
            ? record => (
              <div className="extra-row">
                <div className="extra-row__head">
                  <Link className="extra-row__edit" to={`/trades/${record.key}/edit`}>
                      Edit
                  </Link>
                  <a href="#" className="extra-row__delete">
                      Delete
                  </a>
                </div>
                <div className="extra-row__main">
                  <div className="extra-row__left">
                    <div className="extra-row__location">
                      <span>Trade limits</span>
                      <p>{record.transactionLimit}</p>
                    </div>
                    <div className="extra-row__currency">
                      <span>Terms of trade</span>
                      <p>{record.terms}</p>
                    </div>
                  </div>
                  <div className="extra-row__right">
                    <span>Location</span>
                    <p>{record.location}</p>
                  </div>
                </div>
              </div>
            )
            : null
        }
        // onChange={(p, f, s) => {
        //   if (Object.keys(s).length > 0) {
        //     tableSort({ field: s.field, order: s.order });
        //   } else {
        //     tableSort({ field: null, order: null });
        //   }
        // }}
      >
        <Column
          title="Date"
          key="createdAt"
          render={(text, record) => formatDate(record.createdAt)}
          sorter={(a, b) => a.createdAt - b.createdAt}
          defaultSortOrder="ascend"
        />

        <Column
          title="Type"
          dataIndex="type"
          key="type"
          columnWidth={80}
          render={(text, record) => <span>{record.type}</span>}
          sorter={(a, b) => sortStrings(a.type, b.type)}
        />
        <Column
          title={() => (
            <span>
              Payment <span className="removable">method</span>
            </span>
          )}
          dataIndex="payment"
          key="payment"
          sorter={(a, b) => sortStrings(a.payment, b.payment)}
          width="25%"
        />

        <Column
          title={() => (
            <span>
              Price <span className="removable">/ BTC</span>
            </span>
          )}
          dataIndex="btcPrice"
          key="btcPrice"
          sorter={withTerms}
          // sortOrder={field === 'btcPrice' && order}
        />

        <Column
          title="Ad status"
          render={(text, record) => <span>status</span>}
          key="transactionLimit"
          sorter={withTerms}
          // sortOrder={field === 'transactionLimit' && order}
        />
      </Table>
    </div>
  );
};

CreatedAdsTableDisplay.propTypes = {
  withTerms: PropTypes.bool.isRequired,
  tradesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      createdAt: PropTypes.number,
      type: PropTypes.string,
      payment: PropTypes.string,
      priceBtc: PropTypes.string,
      status: PropTypes.string,
      transactionLimit: PropTypes.string,
      location: PropTypes.string,
      terms: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

CreatedAdsTableDisplay.defaultProps = {
  loading: true,
};

export default CreatedAdsTableDisplay;
