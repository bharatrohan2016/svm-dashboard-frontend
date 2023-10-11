import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import SignIn from './Components/User/SignIn';
import DashBoard from './Components/User/DashBoard';
import Sidebar from './Components/User/Sidebar';
import Farmer from './Components/User/Farmer';
import About from './Components/User/About';
import MapComponent from './Components/User/MapComponent';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route element={<Sidebar /> }>
              <Route path='/dashboard' element={<DashBoard/>} />
              <Route path='/farmer' element={<Farmer/>} />
              <Route path='/map' element={<MapComponent/>} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
