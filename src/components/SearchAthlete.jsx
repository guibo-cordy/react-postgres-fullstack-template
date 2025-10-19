import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
function SearchAthlete ({data, provideAthlete}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // set initial options
      
      setOptions(data.map((item) => ({
        value: item.dos,
        label: `${item.name} ${item.famillyName} (Dossard ${item.dos})`
      })));

    }
  }, [data]);

  const handleSearch = (value) => {
    console.log('want filter on value', value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.dos.toString().includes(value)
    );

    setOptions(filtered.map((item) => ({
      value: item.dos,
      label: `${item.name} (Dossard ${item.dos})`
    })));
  }

  const handleSelectAthlete = (value, a) => {
    console.log('handleSelectAthlete', value);
    console.log('handleSelectAthlete', a);
    provideAthlete(data.find((d) => d.dos === value))
  }

  return (
    <div>
      <AutoComplete
        options={options}
        style={{width: 300 }}
        onSearch={handleSearch}
        onSelect={(v, a) => handleSelectAthlete(v, a)}
        placeholder="doss name fammilyname"
        allowClear
      />
    </div>
  );
}

export default SearchAthlete;