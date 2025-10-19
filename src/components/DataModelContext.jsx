// ThemeContext.js
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { getCountryFlagFromCode } from '../lib/data-utils';

const DataModelContext = createContext();

/*
  rules :
  json dataModel includes keys : columns
    columns :
      - only on columns with role='id'
      - mandatory key "role", can be : id, name, time, ...
      - mandatory key "key", the unic technical filed key
      - mandatory key "importName" name of the colmun in the csv import file
      - optional key "rolePosition"  for a defined role set the position in display
      - optional key "translateKey" key for translation      
      - optional key "render" key, can be flag, time ...
*/

function DataModelProvider({ children }) {
  const [dataModel, setDataModel] = useState({});
  const [columns, setColumns] = useState([]);
  const [attId, setAttId] = useState("name");

  const renderLibrairy = {
    flag: (value) => {
        const url = `https://flagcdn.com/24x18/${value.toLowerCase()}.png`;
        return <img src={url} alt={`Flag of ${value}`} width="24" height="18" />;
      // return (<span>{getCountryFlagFromCode(value)}</span>)
    },
    time: (value) => (<div>{`T:${value}`}</div>),
    link: (value) => (<a>{`https:${value}`}</a>),
    default: (value) => (<div>{value}</div>)
  };
  
  const upadateDataModel = (dmJson) => {
    console.log(dmJson);
    setDataModel(dmJson);
  };

  useEffect(() => {
    if (dataModel.columns) {
      setAttId(dataModel?.columns?.find((c) => c.role === 'id'));
      const newCols = dataModel.columns.map((col) => ({
        title: col.key,
        dataIndex: col.key,
        key: col.key,
        render: renderLibrairy?.[col?.render] ?? renderLibrairy.default,
      }));
      setColumns(newCols);
    }
  }, [dataModel]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataModelContext.Provider value={{ columns, attId, upadateDataModel }}>
      {children}
    </DataModelContext.Provider>
  );
}

DataModelContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataModelContext, DataModelProvider };
