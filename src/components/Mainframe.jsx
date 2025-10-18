import { useContext } from 'react';
import { useNavigate, useParams } from "react-router";
import { Button } from 'antd';
import { ThemeContext, dbthemes } from '../layout/ThemeContext';
import apps from '../applications/applications.json';

function Mainframe() {
  const navigate = useNavigate();
  const { theme, upadateTheme } = useContext(ThemeContext);
  const params = useParams();

  const handleClickNavigateToApp = (app) => {
    console.log(app);
    console.log(params);
    if (app?.path) {
      navigate(app.path);
    }
  }

  return (
  <div className="container-mainframe">
    <div className="mainframe-header">
        <div>Welcom to the web master page</div>
        <div className='button-group'>
          <Button
            onClick={() => upadateTheme(dbthemes.find((t) => t.key !== theme).key)}
            >
              {dbthemes.find((t) => t.key !== theme).icon}
          </Button>
        </div>
    </div>
    <div className="mainframe-content">
      {/* {"azertyuiopmlkjnhbgvfcdxsqw".split``.map((c) => (<div key={c}>{c}</div>))} */}
      <div>All applications</div>
      <div className='button-group'>
        {apps.map((app) => (
        <Button
          key={app.key}
          onClick={() => handleClickNavigateToApp(app)}
        >
          {app?.label ?? app.key }
        </Button>
        
      )) }
      </div>
    </div>
    <div className="mainframe-footer">
        <div>{'made by GBO-dev corp'}</div>
      </div>
  </div>
  );
}

export default Mainframe;