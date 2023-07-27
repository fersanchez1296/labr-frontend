import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { getMorty } from '../../services/auth.services';
import { clearLocalStorage } from '../../utilities/localStorage.utilities';

export const Login =() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/`, { replace: true });
  }, []);

  const login = async () => {
    try {
      const result = await getMorty();
      const rol = result && result.length > 0 ? result[0].rol : "";
      dispatch(createUser({ ...result, rol}));
      if(rol === "ALUMNO"){
        navigate(`/student`, { replace: true });
      }else if(rol === "ADMINISTRADOR"){
        navigate(`/admin`, { replace: true });
      }else{
        navigate(`/teacher`, { replace: true });
      }
      
    } catch (error) {}
  };
  return (
    <div>
      <h2>HOLA ESTE ES EL LOGIN</h2>
      <button onClick={login}>LOGIN</button>
    </div>
  );
}
export default Login;
