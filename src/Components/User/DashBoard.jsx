import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ToastContainer, toast } from 'react-toastify';
import styled from '@emotion/styled';
import { getDBFirstRow } from '../../Service/api';
import styles from './Dashboard.module.css'
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
    min-height: 50vh;
    padding: 0;
    margin: 0;
  }
`

const PieCharts = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40vh;
  overflow-y: hidden;
  margin-left : 30px;
  margin-right : 30px;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    min-height: 65vh; 
    padding: 0;
    padding : 20px;
    overflow-x: visible;
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
const VisualBox =  styled(Box)`
display: flex;
align-items : center;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
border: 1px solid #d3d3d3;
text-align : left;
padding : 30px;
border-radius: 30px;
color: white;
width : 35vw;
margin-top:10px;
font-size:20px;
font-weight : bold;
@media (max-width: 400px) {
  width: 70vw;
  padding : 20px;
  display: flex;
}
`

const DashBoard = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const random = () => getDBFirstRow().then((response) => {
      setData(response?.data)
    })

    random()
  }, [])

  const date = new Date(data?.dateSurvey);
  return (
    <>
     <ToastContainer/>
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
          <span>Date Survey</span> <br/><br/>
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
          <span>Area Survey</span> <br/><br/>
          <span >62 Acres</span>
          </div>
          <div className='col-md-3'>
             <img src='https://cdn-icons-png.flaticon.com/512/187/187039.png' height={80} width={80} className='dashboard-img'/>
          </div>
        </RectangleBox>
      </HeaderComponent>
      
      <PieCharts>
      <PieChart
        style={{'margin': '0'}}
        series={[
          {
            data: [
              { id: 0, value: 38, label: 'Whatsapp' },
              { id: 1, value: 17, label: 'Cell Phone' },
              { id: 2, value: 56, label: 'No Whatsapp' },
            ],
            cx: 70,
          },
        ]}
        width={300}
        height={200}
      />
    
      <PieChart
        
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
            cx: 70,
          },
        ]}
      width={300}
        height={200}
      />
     
      </PieCharts>
      
      
      <BarBox>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={400}
          height={300}
          style={{'margin': '0'}}
        />
      </BarBox>
     
    </>
  )
}

export default DashBoard