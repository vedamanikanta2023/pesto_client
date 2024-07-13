// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/login';
import { RequireAuth } from './Components/Authentication/RequireAuth';
import HomePage from './Components/homePage';
import { useAuth } from './Components/Authentication/Auth';
import { useSelector } from 'react-redux';

function App() {
  // const componentAuthentication = (jsx)=><RequireAuth>{jsx}</RequireAuth>;
const auth = useAuth();
const isLoggedIn = useSelector((state)=>state.app.isLoggedIn);

  return (
    <div className="App">
      {
        isLoggedIn &&
        <div><button onClick={()=>auth.logout()}>logout</button></div>
        }
      <Routes>
        <Route exact path='login' element={<LoginPage />} />
        <Route exact path='/' element={
          // componentAuthentication(<HomePage />)
          <RequireAuth>
            <HomePage />
          </RequireAuth>
      } />
      </Routes>
    </div>
  );
}

export default App;
