import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import SignIn from './Components/User/SignIn';
import DashBoard from './Components/User/DashBoard';
import Sidebar from './Components/User/Sidebar';
import Farmer from './Components/User/Farmer';
import About from './Components/User/About';
import MapComponent from './Components/User/MapComponent';
import ProtectedRoute from './Components/User/ProtectedRoute';
import NavigateDashboard from './Components/User/NavigateDashboard';
import FarmerProfile from './Components/User/FarmerProfile';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Components/ErrorPage';
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={ <NavigateDashboard> <SignIn/></NavigateDashboard>} />
            <Route element={<Sidebar /> }>
              <Route path='/dashboard' 
              element={ <ProtectedRoute> <DashBoard/></ProtectedRoute>} />
              
              <Route path='/farmer' 
              element={<ProtectedRoute> <Farmer/> </ProtectedRoute>} />
              <Route path='/view' element={<ProtectedRoute> <FarmerProfile/> </ProtectedRoute>} />
              <Route path='/map' element={<ProtectedRoute> <MapComponent/> </ProtectedRoute>} />
              <Route path='/about' element={<ProtectedRoute> <About/> </ProtectedRoute>} />
              
              <Route element={<Box style={{'color': 'lightgrey', borderTop: '1px solid lightgrey'}}>
        Copyright © 2023 BharatRohan® - Revitalizing agriculture
      </Box>}/>
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
