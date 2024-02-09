import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import SignIn from './Components/User/SignIn';
import DashBoard from './Components/User/DashBoard';
import Sidebar from './Components/User/Sidebar';
import Farmer from './Components/User/Farmer';
import About from './Components/User/About';
import ProtectedRoute from './Components/User/ProtectedRoute';
import NavigateDashboard from './Components/User/NavigateDashboard';
import FarmerProfile from './Components/User/FarmerProfile';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Components/ErrorPage';
import { Box } from '@mui/material';
import TestFile from './Components/User/TestFile';
import Map from './Components/User/Map';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path='/' element={ <NavigateDashboard> <SignIn/></NavigateDashboard>} />
              <Route element={<Sidebar /> }>
                <Route path='/dashboard' element={ <ProtectedRoute> <DashBoard/></ProtectedRoute>}  />
                <Route path='/farmers' element={<ProtectedRoute> <Farmer/> </ProtectedRoute>} />
                <Route path='/profile/:id' element={<ProtectedRoute> <FarmerProfile/> </ProtectedRoute>} />
                <Route path='/test-url' element={<ProtectedRoute> <TestFile/> </ProtectedRoute>} />
                <Route path='/about' element={<ProtectedRoute> <About/> </ProtectedRoute>} />
                
                <Route element={<Box style={{'color': 'lightgrey', borderTop: '1px solid lightgrey'}}>
                  Copyright © 2023 BharatRohan® - Revitalizing agriculture
                </Box>}/>
              </Route>
              <Route path='/map' element={<ProtectedRoute> <Map/> </ProtectedRoute>} />
              <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
