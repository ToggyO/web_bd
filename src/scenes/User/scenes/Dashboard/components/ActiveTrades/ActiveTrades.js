import React from 'react';
import { Table } from 'antd';
import { PATH } from 'router-paths';
import './style.less';

const columns = [
  { title: '#', dataIndex: 'id', key: 'id' },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => a.createdAt - b.createdAt,
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => a.type.length - b.type.length,
  },
  {
    title: 'Payment method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
  },
  {
    title: 'Transaction limits',
    dataIndex: 'transactionLimits',
    key: 'transactionLimits',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => b.status - a.status,
    defaultSortOrder: 'descend',
    render: (text, record) => (
      <span className={record.status ? 'shown' : 'hidden'} data-status={record.status}>
        {record.status ? 'Shown' : 'Hidden'}
      </span>
    ),
  },
];

const initialData = [
  {
    key: 1,
    id: 378274,
    createdAt: 111,
    type: 'Buy',
    paymentMethod: 'PayPal',
    transactionLimits: '1100 - 1200 USD',
    status: true,
    details: {
      location: 'Moscow, Russian Federation',
      currency: 'RUB / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium earum voluptatem provident sit consequuntur magnam, aut impedit ex, cupiditate rerum autem vitae ullam! Numquam, a sed modi nostrum. Eaque, accusamus?',
    },
  },
  {
    key: 2,
    id: 378275,
    createdAt: 112,
    type: 'Sell',
    paymentMethod: 'PayPal',
    transactionLimits: '1100 - 1200 USD',
    status: false,
    details: {
      location: 'Boston, United States',
      currency: 'USD / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, harum. Nostrum, ut. Quam dolorem animi, nesciunt architecto laboriosam! Quaerat ducimus eaque consequatur possimus quas culpa, veniam sed veritatis quasi reiciendis.',
    },
  },
  {
    key: 3,
    id: 378276,
    createdAt: 113,
    type: 'Buy',
    paymentMethod: 'PayPal',
    transactionLimits: '1100 - 1200 USD',
    status: true,
    details: {
      location: 'Denver, United States',
      currency: 'USD / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae enim provident ex voluptas quos quaerat cupiditate dicta sed? Ex fugiat deserunt dolore, nam unde, quidem facilis soluta animi neque quos!',
    },
  },
  {
    key: 4,
    id: 378277,
    createdAt: 114,
    type: 'Buy',
    paymentMethod: 'Cash deposite',
    transactionLimits: '1100 - 1200 USD',
    status: false,
    details: {
      location: 'Hong Kong, HK',
      currency: 'HKD / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa tenetur vitae enim iusto sunt quia minima, debitis qui quas soluta et unde, odit nemo, dolores voluptates commodi ea animi a!',
    },
  },
  {
    key: 5,
    id: 378278,
    createdAt: 115,
    type: 'Sell',
    paymentMethod: 'Cash deposite',
    transactionLimits: '1100 - 1200 USD',
    status: false,
    details: {
      location: 'Novosibirsk, Russian Federation',
      currency: 'RUB / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate perferendis at facilis perspiciatis adipisci, ut natus error quae autem impedit, laborum eligendi consequatur optio esse placeat, eos officiis nesciunt fugit.',
    },
  },
  {
    key: 6,
    id: 378279,
    createdAt: 117,
    type: 'Buy',
    paymentMethod: 'PayPal',
    transactionLimits: '1100 - 1200 USD',
    status: false,
    details: {
      location: 'Omsk, Russian Federation',
      currency: 'RUB / BTC',
      terms:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus reprehenderit iste assumenda a delectus in mollitia, commodi dolores tempora necessitatibus laborum esse et laudantium quam deleniti, sed blanditiis rerum ratione.',
    },
  },
];

class ActiveTrades extends React.Component {
  state = {
    data: [],
    expandedRowKeys: [],
  };

  componentDidMount() {
    this.setState({ data: initialData });
  }

  handleExpand = (expanded, record) => {
    this.setState({ expandedRowKeys: expanded ? [record.key] : [] });
  };

  handleEdit = () => {
    console.log('edit mode!');
  };

  handleDelete = () => {
    console.log('delete mode');
  };

  toggleStatus = (e, record) => {
    console.log(e);
    if (e.target.dataset.status) {
      // gonna be moved to redux
      this.setState({
        data: this.state.data.map(el =>
          el.key === record.key ? { ...el, status: !el.status } : el,
        ),
      });
    }
  };

  render() {
    const ExtraRow = record => (
      <div className="extra-row">
        <div className="extra-row__head">
          <a href="#" className="extra-row__edit">
            Edit
          </a>
          <a href="#" className="extra-row__delete" onClick={this.handleDelete}>
            Delete
          </a>
        </div>
        <div className="extra-row__main">
          <div className="extra-row__left">
            <div className="extra-row__location">
              <span>Location</span>
              <p>{record.details.location}</p>
            </div>
            <div className="extra-row__currency">
              <span>Currency</span>
              <p>{record.details.currency}</p>
            </div>
          </div>
          <div className="extra-row__right">
            <span>Terms of trade</span>
            <p>{record.details.terms}</p>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <h2 className="dashboard__header">Active trades</h2>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 4 }}
          expandedRowKeys={this.state.expandedRowKeys}
          onExpand={this.handleExpand}
          expandedRowRender={record => ExtraRow(record)}
          onRow={record => ({
            onClick: e => this.toggleStatus(e, record),
          })}
        />
      </>
    );
  }
}

export default ActiveTrades;