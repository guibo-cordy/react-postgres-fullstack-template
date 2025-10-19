import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { ThemeContext, dbthemes } from '../../layout/ThemeContext';
import { DataModelContext } from '../../components/DataModelContext';
import defautlDm from '../../lib/default.json';
import TableResult from '../../components/TableResult';
import SearchAthlete from '../../components/SearchAthlete';
import AtheleteCard from '../../components/AtheleteCard';
import { generateDummyData } from '../../lib/dummy-data-utils'
import { groupDurationsByPercentile } from '../../lib/data-utils'

function DemoChart() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);
  const { columns, upadateDataModel } = useContext(DataModelContext);
  const [data, setData] = useState([]);
  const [chartCats, setChartCats] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [selectedAthletes, setSelectedAthletes] = useState([]);

  const handleGoBackHome = () => {
    navigate('/');
  }

  const handleGenerateDummyData = () => {
    setSelectedAthletes([]);
    if (columns?.length > 0) {
      const newData = generateDummyData(defautlDm);
      setData(newData);
    };
  };
  
  useEffect(() => {
    handleGenerateDummyData()
  }, [columns]);

  useEffect(() => {
    handleGenerateDummyData();
    if (columns?.length === 0) {
      upadateDataModel(defautlDm);
    }
  }, []);

  useEffect(() => {
    console.log('selected atheletes change', selectedAthletes)
  }, [selectedAthletes]);

  useEffect(() => {
    if (data.length > 0) { // for log
      console.log(JSON.stringify(data[0]));
    }
    const res = groupDurationsByPercentile(data.map((d) => d.duration));
    console.log(res);
    setChartCats(res.map((r) => r.categories));
    setChartSeries([{name: 'percent', data: res.map((r) => r.count)}]);
  }, [data])

  const handleProvideAthlete = (a) => {
    if (a?.dos !== undefined) {
      setSelectedAthletes((p) => {
        if (!p.some((pa) => pa.dos === a.dos)) {
          return [...p, a];
        }
        return p;
      });
    }
  };

  const handleRemoveAthlete = (athlete) => {
    setSelectedAthletes((p) => p.filter((a) => a.dos !== athlete.dos));
  };

  return (
    <div className="container-mainframe">
      <div className="mainframe-header">
          <div>WIP search & table & chart</div>
          <div className='button-group'>
            <Button
              onClick={() => handleGoBackHome()}
              >
              <HomeOutlined />
            </Button>
            <Button
              onClick={() => upadateTheme(dbthemes.find((t) => t.key !== theme).key)}
              >
              {dbthemes.find((t) => t.key !== theme).icon}
            </Button>
          </div>
      </div>
      <div className="mainframe-content">
        {data.length === 0 && (<div>No data here</div>)}
        <div className='button-group'>
          <Button
            onClick={() => handleGenerateDummyData()}
            >
            Generate random data
          </Button>
          <SearchAthlete
            data={data ?? []}
            provideAthlete={(e) => handleProvideAthlete(e)}
          />
        </div>
        {selectedAthletes?.length > 0 && (
          <div className="selected-athletes-container">
            {selectedAthletes.map((a) => (
              <AtheleteCard
                key={a.dos}
                athlete={a}
                handleRemoveAthlete={handleRemoveAthlete}
              />
            ))}
          </div>
        )}
        <div style={{ maxWidth: '100%', margin: 'auto' }}>
          <TableResult
            data={data ?? []}
            tableName="my first random table"
          />
        </div>
        {data?.length > 0 && (
          <div style={{ xidth: '300px', margin: 'auto' }}>
            <Chart
              options={{
                  chart: {
                    type: 'line',
                    zoom: { enabled: false },
                    toolbar: { show: false }
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  xaxis: {
                    categories: chartCats,
                  },
                  theme: {
                    mode: 'dark'
                  },
                  responsive: [{
                    breakpoint: 768,
                    options: {
                      chart: { width: '100%' }
                    }
                  }]
                }}
              series={chartSeries}
              type="line"
              height={300}
            />
          </div>
        )}

      </div>
      <div className="mainframe-footer">
        <div>{'made by GBO-dev corp'}</div>
      </div>
  </div>
  )
}

export default DemoChart;