import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, LinearProgress } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ToastContainer, toast } from 'react-toastify';
import styled from '@emotion/styled';
import { getDashboardInfo, getFarmers, getOtherFarmers } from '../../Service/api';
import styles from './Dashboard.module.css'
import { useTheme } from '@emotion/react';
import MapComponent from './MapComponent';
import { useNavigate } from 'react-router-dom';
const HeaderComponent = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30vh;
  overflow-y: hidden;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    min-height: 70vh;
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



const BarBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  @media (max-width: 400px) {
    width: 70vw;
    display: flex;
    justify-content: start;
  }
`

const SectionThree = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
  @media (max-width: 400px) {
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
  width: 26vw;
  border: 1px solid #d3d3d3;
  text-align : left;
  padding : 30px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: white;
  font-size:20px;
  font-weight : bold;
  @media (max-width: 400px) {
    width: 70vw;
    padding : 20px;
    display: flex;
  }
`

const BarBx = styled(Box)({
  '@media(max-width: 400px)':{
    overflowX: 'scroll',
    paddingLeft : '5vw',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  }
})

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
  const [object, setObject] = useState();
  const theme = useTheme();
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
        setObject(obj);
      }else{
        navigate('/');
      }
     }

    // random()
    api_calls();
  }, [])


  // const date = new Date(data?.dateSurvey);
  // if(typeof object === 'undefined' || data === undefined){
  //   return (
  //     <LinearProgress color="primary" />
  //   )
  // }
  // if(Object.keys(object).length === 0){
  //   return (
  //     <h3>No entries has been made.</h3>
  //   )
  // }
  return (
    <Box style={{'padding': '0'}}>
      <HeaderComponent>
        <RectangleBox className={styles.dashboard1}>
         <div className='col-md-9'>
          <span>Total Farmers </span> <br/><br/>
          <span >{size}</span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
        <RectangleBox className={styles.dashboard2}>
        <div className='col-md-9'>
          <span>Last Date of Survey</span> <br/><br/>
          <span>
            17/07/2024
          {/* {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })} */}
          </span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
        <RectangleBox className={styles.dashboard3}>
        <div className='col-md-9'>
          <span>Total Area Surveyed</span> <br/><br/>
          <span>{area} Acres</span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
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
    </Box>
  )
}

export default OtherDashBoard;



// <PieCharts>
//         <PieChart
//           series={[
//             {
//               data: [
//                 { id: 0, value: 38, label: 'Smart Phone'},
//                 { id: 1, value: 84, label: 'Analog Phone' },
//                 { id: 2, value: 20, label: 'No Phone', labelPosition: 95 },
//               ],
//               arcLabel: (item) => `${item.label} (${item.value})`,
//               cx: 70,
//               arcLabelMinAngle: 45,
//             },
//           ]}
//           sx={{
//             [`& .${pieArcLabelClasses.root}`]: {
//               fill: 'white',
//               fontWeight: 'bold',
//               fontSize: '6px',
//               textAnchor: 'center'
//             },
//           }}
//           width={300}
//           height={350}
//           slotProps={{
//             legend: {     
//               position: { vertical: 'middle', horizontal: 'right' },
//             }
//           }}
//         />
    
//           {/* <BarBox style={{padding: '0'}}> */}
//             <BarChart
//               xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
//               series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
//               width={350}
//               height={300}
              
//             />
//           {/* </BarBox> */}
     
//       </PieCharts>
      
//         <BarBx sx={{width: '100vw', display: 'flex', justifyContent: 'center', backgroundColor : '#F8F8F8'}}>
//           {
//             object!={} ? 
//             <>
//             <BarChart
//                 yAxis={[{ scaleType: 'band', data: Object.keys(object)
//               }]}
//                 series={[
//                   { data: Object.values(object), label: 'Number Of Farmers', id: 'farmers', stack: 'total' }
//                 ]}
//                 slotProps={{
//                   legend: {
//                     labelStyle: {
//                       fontSize: 14,
//                       fill: 'blue',
//                     },
//                   },
//                 }}
                
//                 width={1000}
//                 height={700}
//                 layout='horizontal'
                
//               />
//             </> : ''
//           }
        
//         </BarBx>