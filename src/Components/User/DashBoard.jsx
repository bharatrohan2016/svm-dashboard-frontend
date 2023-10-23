import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ToastContainer, toast } from 'react-toastify';
import styled from '@emotion/styled';
import { getDBFirstRow } from '../../Service/api';
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

const MapBox = styled(Box)({
  height: '40vh',
  width: '80vw',
  '@media (max-width: 768px)': {
    height: '40vh',
    width: '70vw'
  },
})

const DashBoard = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()
  const theme = useTheme();
  useEffect(() => {
    const random = () => getDBFirstRow().then((response) => {
      setData(response?.data)
    })

    random()
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
      
      <SectionThree>
        <MapBox>
          <MapComponent />
          <Button onClick={() => {
            navigate('/map')
          }}> View Full Map</Button>
        </MapBox>
        
      </SectionThree>
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
    
          {/* <BarBox style={{padding: '0'}}> */}
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
              series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
              width={350}
              height={300}
            />
          {/* </BarBox> */}
     
      </PieCharts>
     
    </Box>
  )
}

export default DashBoard