/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal, Tag } from 'antd';
import history from '@services/history';
import { formatDate, sortStrings } from '@utils';
import { NoData } from '@scenes/_components/TradesTable/_components/NoData';
import './style.less';
import { Spinner } from '@components/Spinner/index';

const { Column } = Table;

const CreatedAdsTableDisplay = ({
  withTerms,
  deleteTradeRequest,
  tradesData,
  loading,
  submitting,
  statusLoading,
  toggleTradeStatusRequest,
}) => {
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

  const [idToToggle, setIdToToggle] = useState('');

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

  const handleStatusToggle = (id, status) => {
    setIdToToggle(() => id);
    toggleTradeStatusRequest({ id, shown: !status });
  };

  return (
    <div>
      <Table
        expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
        dataSource={tradesData}
        loading={{spinning: loading, indicator: <Spinner />}}
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
          key="createdAt"
          title="Date"
          render={(text, record) => formatDate(record.createdAt)}
          sorter={(a, b) => a.createdAt - b.createdAt}
          defaultSortOrder="descend"
        />

        <Column
          key="type"
          dataIndex="type"
          title="Type"
          columnWidth={80}
          render={(text, record) => record.type
          }
          sorter={(a, b) => sortStrings(a.type, b.type)}
        />
        <Column
          key="payment"
          title={() => (
            <span>
              Payment <span className="removable">method</span>
            </span>
          )}
          dataIndex="payment"
          sorter={(a, b) => sortStrings(a.payment, b.payment)}
          width="25%"
        />

        <Column
          align="right"
          title={() => (
            <span>
              Price <span className="removable">/ BTC</span>
            </span>
          )}
          dataIndex="btcPrice"
          key="btcPrice"
          width="20%"
        />

        <Column
          title="Status"
          align="center"
          render={(text, record) => (
            <Spinner
              fontSize={16}
              margin="-7px 0 0 40px"
              spinning={statusLoading && idToToggle === record.key}
            >
              <Tag
                color={record.shown ? 'green' : ''}
                onClick={() => handleStatusToggle(record.key, record.shown)}
              >
                {record.shown ? 'Shown' : 'Hidden'}
              </Tag>
            </Spinner>
          )}
          key="dispayStatus"
          sorter={withTerms}
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
  statusLoading: PropTypes.bool,
  toggleTradeStatusRequest: PropTypes.func,
};

CreatedAdsTableDisplay.defaultProps = {
  loading: true,
};

export default CreatedAdsTableDisplay;
