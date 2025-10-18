import { useNavigate } from "react-router";
import { Button } from 'antd';

function ApplicationTrail() {
  const navigate = useNavigate();

    const handleGoBackHome = () => {
    navigate('/');
  }
  return (
    <div>
      <h1>Trail application</h1>
      <Button
      onClick={() => handleGoBackHome()}
      >Go back home</Button>
    </div>
  )
}

export default ApplicationTrail;