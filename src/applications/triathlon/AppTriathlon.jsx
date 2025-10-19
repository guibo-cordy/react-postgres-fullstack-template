import { useContext } from 'react';
import { useNavigate } from "react-router";
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import TableResult from '../../components/TableResult';
import { ThemeContext, dbthemes } from '../../layout/ThemeContext';

function AppTriathlon() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);

    const handleGoBackHome = () => {
    navigate('/');
  }
  return (
    <div className="container-mainframe">
      <div className="mainframe-header">
          <div>App tri WIP</div>
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
        {/* {"azertyuiopmlkjnhbgvfcdxsqw".split``.map((c) => (<div key={c}>{c}</div>))} */}
        
        <Button
        onClick={() => handleGoBackHome()}
        >Go back home</Button>
        <TableResult data={[{name: "toto"}, {name:'titi'}]} tableName="it's a moisi table" />
      </div>
      <div className="mainframe-footer">
        <div>{'made by GBO-dev corp'}</div>
      </div>
  </div>
  )
}

export default AppTriathlon;