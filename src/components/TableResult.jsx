import { useState, useEffect, useContext } from 'react';
import { Table } from 'antd';
import { DataModelContext } from '../components/DataModelContext';

function TableResult({tableName, data}) {
  const [dataTable, setDataTable] = useState([]);
  const { columns, attId } = useContext(DataModelContext);

  useEffect(() => {
    if (data.length > 0) {
      const newDataTable = data.map((d) => ({
        ...d,
        key: d[attId?.key]
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