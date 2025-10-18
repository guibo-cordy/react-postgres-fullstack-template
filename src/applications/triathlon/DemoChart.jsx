import React, { useContext } from 'react';
import { useNavigate } from "react-router";
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { ThemeContext, dbthemes } from '../../layout/ThemeContext';

function DemoChart() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);

  const options = {
    chart: {
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
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
  };

  const series = [
    {
      name: 'Activité',
      data: [10, 41, 35, 51, 49, 62, 69]
    }
  ];


  const handleGoBackHome = () => {
    navigate('/');
  }

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
        <div style={{ maxWidth: '100%', margin: 'auto' }}>
          <Chart options={options} series={series} type="line" height={300} />
        </div>

      </div>
      <div className="mainframe-footer">
        <div>{'made by GBO-dev corp'}</div>
      </div>
  </div>
  )
}

export default DemoChart;