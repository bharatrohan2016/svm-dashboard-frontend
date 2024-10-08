import logo from './logo.svg';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import SignIn from './Components/User/SignIn';
import DashBoard from './Components/2023/DashBoard';
import Sidebar from './Components/2023/Sidebar';
import Farmer from './Components/2023/Farmer';
import About from './Components/2023/About';
import ProtectedRoute from './Components/User/ProtectedRoute';
import NavigateDashboard from './Components/2023/NavigateDashboard';
import FarmerProfile from './Components/2023/FarmerProfile';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Components/ErrorPage';
import { Box } from '@mui/material';
import TestFile from './Components/User/TestFile';
import Map from './Components/2023/Map';
import SelectYear from './Components/SelectYear/SelectYear';
import OthersDasboard from './Components/Others/OthersDashboard';
import OtherSidebar from './Components/Others/OtherSidebar';
import OthersFarmer from './Components/Others/Farmer';
import OtherAbout from './Components/Others/About';
import OtherFarmerProfile from './Components/Others/FarmerProfile';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path='/' element={ <NavigateDashboard> <SignIn/></NavigateDashboard>} />
              <Route element={<Sidebar /> }>
                <Route path='/dashboard' element={ <ProtectedRoute> <DashBoard/></ProtectedRoute>}  />
                <Route path='/farmers' element={<ProtectedRoute> <Farmer/> </ProtectedRoute>} />
                <Route path='/profile/:id' element={<FarmerProfile/>} />
                <Route path='/test-url' element={<ProtectedRoute> <TestFile/> </ProtectedRoute>} />
                <Route path='/about' element={<ProtectedRoute> <About/> </ProtectedRoute>} />
                <Route element={<Box style={{'color': 'lightgrey', borderTop: '1px solid lightgrey'}}>
                  Copyright © 2023 BharatRohan® - Revitalizing agriculture
                </Box>}/>
              </Route>
              <Route path='/map' element={<ProtectedRoute> <Map/> </ProtectedRoute>} />
              <Route element={<OtherSidebar />}>
                <Route path='/other-dashboard' element={<ProtectedRoute><OthersDasboard /></ProtectedRoute>} />
                <Route path='/other-farmer' element={<ProtectedRoute><OthersFarmer /></ProtectedRoute>} />
                <Route path='/farmer-profile/:id' element={<ProtectedRoute><OtherFarmerProfile /></ProtectedRoute>} />
                <Route path='/other-about' element={<ProtectedRoute><OtherAbout /></ProtectedRoute>} />
              </Route>
              <Route path='/select-year' element={<ProtectedRoute><SelectYear /></ProtectedRoute>} />
              <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
