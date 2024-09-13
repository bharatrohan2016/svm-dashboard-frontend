import React, { useEffect, useState } from 'react';
import { Box, Button} from '@mui/material'
import styled from '@emotion/styled';
import { getOtherFarmers } from '../../Service/api';
import styles from './Dashboard.module.css'
import MapComponent from './MapComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getHeaders } from '../User/ProtectedRoute';
import VillageAreaChart from './VillageAreaChart';
import CropPieChart from './CropPieChart';
import VillageWiseFarmer from './VillageWiseFarmer';
import CropArea from './CropArea';

const HeaderComponent = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  flex-wrap : wrap;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    height: 70vh;
    padding: 0;
    margin: 0;
  }
`

const PieCharts = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40vh;
  width: 90vw;
  overflow-y: hidden;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    min-height: 80vh; 
    width: 100vw; 
    padding: 0;
    overflow-x: hidden;
  }
`

const SectionThree = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    min-height: 60vh; 
    width: 100vw;
    padding: 0;
    overflow-x: hidden;
  }
`



const RectangleBox = styled(Box)`
  display: flex;
  align-items : center;
  width: 28vw;
  text-align : left;
  padding : 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: black;
  font-size:20px;
  font-weight : bold;
  @media (max-width: 500px) {
    margin-top : 15px;
    width: 70vw;
    padding : 20px;
    display: flex;
  }
`


const MapBox = styled(Box)({
  height: '40vh',
  width: '80vw',
  '@media (max-width: 768px)': {
    height: '40vh',
    width: '70vw'
  },
})

const OtherDashBoard = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState(0);
  const [size, setSize] = useState(0);
 
  const [cropWiseData,setCropWiseData] = useState({});


  useEffect(() => {
    const api_calls = async() =>{
      const response = await getOtherFarmers();
      console.log(response)
      if(response?.data){
        let obj = {};
        let area = 0;
        for(let item of response?.data){
          obj[item.village] = obj[item.village] === undefined ? 1 : obj[item.village] + 1;
          for(let map of item.maps){
            area += parseInt(map.area);
          }
        }
        setArea((area/4046.8564224).toFixed(2));
        setSize(response?.data.length)
        // setObject(obj);
      }else{
        navigate('/');
      }
     }

    api_calls();

    //cropwise data for pie-chart
    const cropwiseFarmers = async () => {
      try{
          const URL = 'https://svmbackend.bharatrohan.in';
          const result = await axios.get(`${URL}/api/cropwise-farmers-number`, {headers : getHeaders()});
          const cropsData= result.data;
          console.log(cropsData);
          setCropWiseData(cropsData);
      }catch(e){
          console.log(e)
      }
    }
    cropwiseFarmers();

  }, [])
  return (
    <Box style={{padding: 0, }}>
      <HeaderComponent>
        <RectangleBox className={styles.dashboard1}>
        
         <div className='col-md-9'>
          <span>Total Farmers </span> <br/><br/>
          <span >{size}</span>
          </div>
          {/* <div className='col-md-3'>
             <img alt="" src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div> */}
        </RectangleBox>
        <RectangleBox className={styles.dashboard2}>
        <div className='col-md-9'>
          <span>Last Date of Survey</span> <br/><br/>
          <span>
            27/08/2024
          {/* {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })} */}
          </span>
          </div>
          {/* <div className='col-md-3'>
             <img alt="" src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div> */}
        </RectangleBox>
        <RectangleBox className={styles.dashboard3}>
        <div className='col-md-9'>
          <span>Total Area Surveyed</span> <br/><br/>
          <span>{area} Acres</span>
          </div>
          {/* <div className='col-md-3'>
             <img alt="" src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div> */}
        </RectangleBox>
      </HeaderComponent>
      
      <SectionThree>
        <MapBox>
          <MapComponent />
          <Button onClick={() => {
            navigate('/map')
          }}> View Full Map</Button>
        </MapBox>
        
      </SectionThree>
      
      
      

      

      <div className={styles.dashboard}>
        <div className={styles.dashboardHeading}>
            <span>Bar Graph shows area coverage for different villages</span>
        </div>
        <div className={styles.dashboardchart}>
            <VillageAreaChart/>
        </div>
      </div>

      

      <div className={styles.dashboard}>
        <div className={styles.dashboardHeading}>
            <span>Bar Graph shows different villages with number of Farmers Onboarded</span>
        </div>
        <div className={styles.dashboardchart}>
            <VillageWiseFarmer/>
        </div>
      </div>
      <div className='row justify-content-between'>
      <div className={`col-md-5 ${styles.dashboard}`}>
          <div className={styles.dashboardHeading}>
              <span>Pie Chart Shows Number of Farmers Using Ginger & Paddy</span>
          </div>
          <div className={styles.dashboardchart}>
            <CropArea/>
          </div>
        </div>
        <div className={`col-md-5 ${styles.dashboard}`}>
          <div className={styles.dashboardHeading}>
              <span>Pie Chart Shows Number of Farmers Using Ginger & Paddy</span>
          </div>
          <div className={styles.dashboardchart}>
            <CropPieChart cropWiseData={cropWiseData}/>
            
          </div>
        </div>
        
      </div>
      </Box>

  )
}

export default OtherDashBoard;
