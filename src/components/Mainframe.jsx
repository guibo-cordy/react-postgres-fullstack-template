import { useContext } from 'react';
import { useNavigate, useParams } from "react-router";
import { Button, Menu } from 'antd';
import { ThemeContext, dbthemes } from '../layout/ThemeContext';

function Mainframe() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);
  const params = useParams();

  const handleTestNavigate = () => {
    console.log(params);
    navigate('/trail');
  }
  
  const handleClick = (e) => {
    console.log('menu click', e);
    upadateTheme(e.key);
  }

  return (
  <div className="container-mainframe">
    <div className="mainframe-header">
      <h1>Welcom to gbodev master page</h1>
      <Menu
        onClick={handleClick}
        style={{ width: '5em' }}
        mode="inline"
        items={dbthemes}
      />
    </div>
    <div className="mainframe-content">
      {"azertyuiopmlkjnhbgvfcdxsqw".split``.map((c) => (<div key={c}>{c}</div>))}
      <div>my div</div>
      <Button
        onClick={() => handleTestNavigate()}
      >
        Test navigate
      </Button>
      <div>end mainframe content</div>
    </div>
    <div className="mainframe-footer">
        <p>{'made by GBO-dev corp'}</p>
        <p>{'made by GBO-dev corp'}</p>
      </div>
  </div>
  );
}

export default Mainframe;