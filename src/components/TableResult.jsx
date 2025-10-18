import { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: text => <div>{text}</div>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: text => <div>{text}</div>,
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function TableResult ({tableName, data}) {
  const [columns, setColumns] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const newCol = Object.entries(data[0]).map((e) => ({
          title: e[0],
          dataIndex: e[0],
          key: e[0],
          render: (text) => <div>{text}</div>,
      }));
      setColumns(newCol);
      const newDataTable = data.map((d, i) => ({
        ...d,
        key: i
      }));
      setDataTable(newDataTable);
    }
  }, [data]);

  return (
    <div>
      <div>{tableName}</div>
      <Table
        columns={columns}
        dataSource={dataTable}
        rowClassName={() => 'custom-table-row'}
        
        components={{
          header: {
            wrapper: (props) => <thead {...props} className="custom-table-header" />
        }
      }}

      />
    </div>
  );
}

export default TableResult;