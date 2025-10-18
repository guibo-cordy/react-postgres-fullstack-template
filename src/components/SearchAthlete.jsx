import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
function SearchAthlete ({data, setAthlete}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // set initial options
      
    setOptions(data.map((item) => ({
      value: item.dos,
      label: `${item.name} (Dossard ${item.dos})`
    })));

    }
  }, [data]);

  const handleSearch = (value) => {
    console.log('want filter on value', value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.dos.includes(value)
    );

    setOptions(filtered.map((item) => ({
      value: item.dos,
      label: `${item.name} (Dossard ${item.dos})`
    })));
  }

  const handleSelectAthlete = (value) => {
    setAthlete(data.find((d) => d.dos === value))
  }

  return (
    <div>
      <AutoComplete
        options={options}
        style={{ marginBottom: 16, width: 300 }}
        onSearch={handleSearch}
        onSelect={handleSelectAthlete}
        placeholder="doss name fammilyname"
        allowClear
      />
    </div>
  );
}

export default SearchAthlete;