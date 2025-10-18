import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { ThemeContext, dbthemes } from '../../layout/ThemeContext';
import TableResult from '../../components/TableResult';
import { defaultModel, generateDummyData } from '../../lib/dummy-data-utils'
import { groupDurationsByPercentile } from '../../lib/data-utils'

function DemoChart() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [chartCats, setChartCats] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  const handleGoBackHome = () => {
    navigate('/');
  }

  const handleGenerateDummyData = () => {
    const newData = generateDummyData(defaultModel);
    setData(newData);
  }


  useEffect(() => {
    handleGenerateDummyData();
  }, []);

  useEffect(() => {
    if (data.length > 0) { // for log
      console.log(JSON.stringify(data[0]));
    }
    const res = groupDurationsByPercentile(data.map((d) => d.duration));
    console.log(res);
    setChartCats(res.map((r) => r.categories));
    setChartSeries([{name: 'percent', data: res.map((r) => r.count)}]);
  }, [data])

  return (
    <div className="container-mainframe">
      <div className="mainframe-header">
          <div>Trail application</div>
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
        <Button
          onClick={() => handleGenerateDummyData()}
        >
          Generate random data
        </Button>
        <div style={{ maxWidth: '100%', margin: 'auto' }}>
          <TableResult
            data={data}
            tableName="my first random table"
          />
        </div>
        <div style={{ maxWidth: '100%', margin: 'auto' }}>
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

      </div>
      <div className="mainframe-footer">
        <div>{'made by GBO-dev corp'}</div>
      </div>
  </div>
  )
}

export default DemoChart;