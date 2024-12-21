import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getcurrentUser } from './services/userService';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { CoverImage, Loading } from './components';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getcurrentUser()
      .then((res) => {
        if(res.data){
          const {
            username, 
            fullname, 
            email, 
            _id, 
            coverImage, 
            avatar, 
            createdAt, 
            updateAt
          } = res.data.data
          dispatch(login({username, fullname, email, _id, coverImage, avatar, createdAt, updateAt}))
          navigate("/")
        }
        else{
          dispatch(logout())
          navigate("/login")
        }
      })
      .finally(() => setLoading(false))
  }, [navigate]); 

  return (
    !loading?(
      <div>
        <Outlet /> {/* Render nested routes */}
      </div>
    ): (<Loading />)
  );
}

export default App;
