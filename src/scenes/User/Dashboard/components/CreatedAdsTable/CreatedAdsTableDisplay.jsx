/* eslint-disable import/no-unresolved */
import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal } from 'antd';
import history from '@services/history';
import { formatDate, sortStrings } from '@utils';
import { NoData } from '@scenes/_components/TradesTable/_components/NoData';
import './style.less';

const { Column } = Table;

const CreatedAdsTableDisplay = ({ withTerms, deleteTradeRequest, tradesData, loading, submitting }) => {

  useEffect(() => {
    if (history.location.state) {
      const tr = document.querySelector(`tr[data-row-key="${history.location.state.id}"]`);
      if (tr) {
        tr.classList.add('hover');
        setTimeout(() => {
          tr.classList.remove('hover');
          history.push({ state: null });
        }, 3000);
      }
    }
  });

  const showConfirm = id => {
    Modal.confirm({
      title: 'Would you like to delete this ad?',
      content: 'This action cannot be undone.',
      onOk() {
        deleteTradeRequest(id);
      },
      okText: 'Yes',
      okButtonProps: {
        style: { width: 74, height: 28 },
        loading: submitting,
      },
      cancelText: 'No',
      cancelButtonProps: {
        style: { width: 74, height: 28 },
      },
      onCancel() {},
      maskClosable: true,
    });
  };

  return (
    <div>
      
      <Table
        expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
        dataSource={tradesData}
        loading={loading}
        locale={{ emptyText: <NoData /> }}
        expandedRowRender={
          withTerms
            ? record => (
              <div className="extra-row">
                <div className="extra-row__head">
                  <Link className="extra-row__view" to={`/trades/${record.key}`}>
                      View
                  </Link>
                  <Link className="extra-row__edit" to={`/trades/${record.key}/edit`}>
                      Edit
                  </Link>
                  <a className="extra-row__delete" onClick={() => showConfirm(record.key)}>
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
      >
        <Column
          title="Date"
          key="createdAt"
          render={(text, record) => formatDate(record.createdAt)}
          sorter={(a, b) => a.createdAt - b.createdAt}
          defaultSortOrder="descend"
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
        />

        <Column
          title="Ad status"
          // eslint-disable-next-line no-unused-vars
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
  deleteTradeRequest: PropTypes.func,
  loading: PropTypes.bool,
  submitting: PropTypes.bool,
};

CreatedAdsTableDisplay.defaultProps = {
  loading: true,
};

export default CreatedAdsTableDisplay;
