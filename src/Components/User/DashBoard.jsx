import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ToastContainer, toast } from 'react-toastify';
import styled from '@emotion/styled';
import { getDBFirstRow, getFarmers } from '../../Service/api';
import styles from './Dashboard.module.css'
import { useTheme } from '@emotion/react';
import MapComponent from './MapComponent';
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
    justify-content: space-around;
    align-items: start;
    min-height: 60vh; 
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
  width : 70vh;
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
  height: 40vh;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    min-height: 85vh; 
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

const MapBox = styled(Box)({
  height: '40vh',
  width: '20vw',
  '@media (max-width: 768px)': {
    height: '40vh',
    width: '70vw'
  },
})

const DashBoard = () => {
  const [data, setData] = useState();
  const [object, setObject] = useState({});
  const theme = useTheme();
  useEffect(() => {
    const random = () => getDBFirstRow().then((response) => {
      console.log(response?.data)
      setData(response?.data);
    })

    const api_calls = async() =>{
      const response = await getFarmers();
      if(response.data){
        let obj = {};
        for(let item of response?.data){
          obj[item.village] = obj[item.village] === undefined ? 1 : obj[item.village] + 1;
        }
        setObject(obj);
      }
    }

    random()
    api_calls();
  }, [])


  const date = new Date(data?.dateSurvey);
  
  return (
    <Box style={{'padding': '0'}}>
      <HeaderComponent>
        <RectangleBox className={styles.dashboard1}>
         <div className='col-md-9'>
          <span>Total Farmers </span> <br/><br/>
          <span >{data?.totalFarmer}</span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
        <RectangleBox className={styles.dashboard2}>
        <div className='col-md-9'>
          <span>Last Date of Survey</span> <br/><br/>
          <span>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
          </span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
        <RectangleBox className={styles.dashboard3}>
        <div className='col-md-9'>
          <span>Total Area Surveyed</span> <br/><br/>
          <span >62 Acres</span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
      </HeaderComponent>
      
      <PieCharts>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 38, label: 'Whatsapp'},
              { id: 1, value: 17, label: 'Mobiles' },
              { id: 2, value: 56, label: 'No\nWhatsapp' },
            ],
            arcLabel: (item) => `${item.label} (${item.value})`,
            cx: 70
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            fontSize: '10px'
          },
        }}
        width={300}
        height={350}
        slotProps={{
          legend: {     
            position: { vertical: 'middle', horizontal: 'right' },
          }
        }}
      />
    
      <PieChart
        
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
            arcLabel: (item) => `${item.label} (${item.value})`,
            cx: 70,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            fontSize: '10px'
          },
        }} 
        width={300}
        height={350}
        slotProps={{
          legend: {     
            position: { vertical: 'middle', horizontal: 'right' },
          }
        }}
      />
     
      </PieCharts>
      <SectionThree>
        <MapBox>
          <MapComponent />
        </MapBox>
        <BarBox>
          <BarChart

            xAxis={[{ scaleType: 'band', data: Object.keys(object) }]}
            series={[
              { data: Object.values(object), label: 'Number Of Farmers', id: 'farmers', stack: 'total' }
            ]}
            width={400}
            height={300}
            style={{'margin': '0'}}
          />
        </BarBox>
      </SectionThree>
     
    </Box>
  )
}

export default DashBoard