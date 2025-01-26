import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {

      navigate('/admin');
    } else {

      const checkToken = async () => {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/auth/check-token', {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin');
        } else if (response.ok) {
          console.log("Authanticated")
        }
      };
      checkToken();

    }
    
  }, [navigate]);
};

export default useAuthCheck;
