import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
      const navigate = useNavigate();
  return <div style={{ width: "100%", height: '60vh' }}>
      <div style={{ margin: '50px', fontSize: '20px' }} onClick={()=> navigate("/properties")}>Link to proiperties</div>
  </div>;
};
export default Home;
