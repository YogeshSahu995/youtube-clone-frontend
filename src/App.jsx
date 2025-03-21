import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getcurrentUser } from './services/userService';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Loading } from './components';
import { setupInterceptors } from './utils/apiInterceptor'

function App() {
  const [loading, setLoading] = useState(false)
  const [offline, setOffline] = useState(!navigator.onLine)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setupInterceptors(navigate);

    const handleOffline = () => setOffline(true);
    const handleOnline = () => {
      setOffline(false);
      window.location.reload();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  useEffect(() => {
    if (!offline) {
      setLoading(true);
      getcurrentUser()
        .then((res) => {
          if (res?.data?.data) {
            const { username, fullname, email, _id, coverImage, avatar, createdAt, updateAt } = res.data.data;
            dispatch(login({ username, fullname, email, _id, coverImage, avatar, createdAt, updateAt }));
            navigate('/')
          } else {
            dispatch(logout());
            navigate('/login')
          }
        })
        .catch((error) => {
          console.log('Error:', error.message)
        })
        .finally(() => {
          setLoading(false)
        });
    }
  }, [dispatch, offline]);

  if (loading) return <Loading />

  if (offline) {
    return (
      <div className='h-[100vh] w-full flex flex-col justify-center items-center gap-4'>
        <img src='./images/no-internet.png' className='h-[5vw] mx-auto' />
        <h1 className='text-red-500 text-xl'>⚠️ No Internet Connection ⚠️</h1>
      </div>
    )
  }

  return (
    !loading ? (
      <div>
        <Outlet />
      </div>
    ) : (<Loading />)
  );
}

export default App;
