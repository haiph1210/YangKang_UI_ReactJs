import './App.css';
import { ToastContainer } from 'react-toastify';
import Slider from './main/slider/Slider';
import ListUser from './main/container/user-service/user/container/ListUser';
import Login from './main/container/auth-service/entity/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RefreshAction } from './main/container/auth-service/redux/AuthAction';
import CustomCheckbox from './main/input/CustomCheckbox';
// import cors from "cors";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if(token) {
      dispatch(RefreshAction());
    }
  },[])

  return (
    <div>
      <div>
        <Slider></Slider>

      </div>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
}

export default App;
