/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Modal, Tag, Row, Col } from 'antd';
import moment from 'moment';

import { NoData } from '@components/NoData';

import history from '@services/history';
import { catchNewLines } from '@utils';
import './style.less';
import { Spinner } from '@components/Spinner';

const { Column } = Table;

export const MyAdsTable = ({
  data: { items, pagination },
  loading,
  deleteAdRequest,
  toggleAdStatusRequest,
  adStatusLoading,
  submitting,
  onChange,
  withTerms,
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
        deleteAdRequest(id);
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
    toggleAdStatusRequest({ id, shown: !status });
  };

  return (
    <div>
      <Table
        dataSource={items}
        loading={{ spinning: loading, indicator: <Spinner /> }}
        locale={{ emptyText: <NoData /> }}
        pagination={pagination}
        onChange={onChange}
        expandedRowRender={
          withTerms
            ? record => (
              <div className="extra-row">
                <div className="extra-row__head">
                  <Link className="extra-row__view" to={`/ads/${record.order}`}>
                      View
                  </Link>
                  <Link className="extra-row__edit" to={`/ads/${record.order}/edit`}>
                      Edit
                  </Link>
                  <a className="extra-row__delete" onClick={() => showConfirm(record.key)}>
                      Delete
                  </a>
                </div>
                <div className="extra-row extra-row__left">
                  <Row>
                    {window.matchMedia('(max-width: 768px)').matches && (
                      <Col xs={12} sm={6}>
                        <div className="extra-row__currency">
                          <span>Date</span>
                          <p>{moment(record.createDate).format('MM.DD.YY')}</p>
                        </div>
                      </Col>
                    )}
                    <Col xs={12} sm={6}>
                      <div className="extra-row__currency">
                        <span>Location</span>
                        <p>{record.location}</p>
                      </div>
                    </Col>
                    {window.matchMedia('(max-width: 570px)').matches && (
                      <Col xs={12} sm={6}>
                        <div className="extra-row__currency">
                          <span>Payment method</span>
                          <p>{record.payment}</p>
                        </div>
                      </Col>
                    )}
                    <Col xs={12} sm={6}>
                      <div className="extra-row__currency">
                        <span>Trade limits</span>
                        <p>{record.tradeLimit}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="extra-row__currency">
                        <span>Terms of trade</span>
                        <p>{catchNewLines(record.terms)}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )
            : null
        }
      >
        <Column
          key="createDate"
          title="Date"
          dataIndex="createDate"
          render={(text, record) => (
            <div className="drum">
              <div className="drum-first">
                <a href="#">{moment(record.createDate).format('MM.DD.YY')}</a>
              </div>
              <div className="drum-second">
                <Link to={`/ads/${record.order}`} data-id={record.key}>
                  View
                </Link>
              </div>
            </div>
          )}
          sorter
          className="hideble-768"
        />

        <Column
          key="type"
          dataIndex="type"
          title="Type"
          columnWidth={80}
          render={(text, record) => record.type}
          sorter
        />

        <Column
          key="payment"
          title={() => (
            <span>
              Payment <span className="removable">method</span>
            </span>
          )}
          dataIndex="payment"
          sorter
          className="hideble-630"
        />

        <Column align="right" title={() => <span>Price / BTC</span>} dataIndex="btcPrice" key="btcPrice" />

        <Column
          title="Status"
          dataIndex="shown"
          align="center"
          render={(text, record) => (
            <Spinner
              fontSize={16}
              margin="-7px 0 0 40px"
              spinning={adStatusLoading && idToToggle === record.key}
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
          sorter
        />
      </Table>
    </div>
  );
};
