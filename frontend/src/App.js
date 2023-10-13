import logo from './logo.svg';
import './App.css';
import UploadImage from './components/UploadImage';
import Alertbar from './components/alertbar';
import Navbar from './components/navbar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import History from './components/history';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Alertbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/users/signup' element={<Signup/>}/>
        <Route exact path='/users/login' element={<Login/>}/>
        <Route exact path='/users/history' element={<History/>}/>
     </Routes>
    </div>
  );
}

export default App;
