import { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
  }
];

function TableResult({tableName, data}) {
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