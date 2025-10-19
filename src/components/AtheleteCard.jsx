import { Button } from 'antd';
import '../css/athelete-card.css';

function AtheleteCard ({athlete, handleRemoveAthlete = () => {}}) {
  const keysToDisplay = 'dos name famillyName'.split` `;
  console.log('athlete card', athlete);
  return (
    <div className="athlete-card">
      <div className="athlete-card-row">
        {keysToDisplay
          .filter((k) => athlete?.[k] !== undefined)
          .map((k) => (<div key={athlete.dos}>{`${k}:${athlete[k]}`}</div>)) 
        }
        <Button
          onClick={() => handleRemoveAthlete(athlete)}
        >
          x
        </Button>
      </div>
    </div>
  );
}

export default AtheleteCard;