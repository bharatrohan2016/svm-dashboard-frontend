import { Box, Typography } from '@mui/material'
import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styled from '@emotion/styled';

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
  height: 20vh;
  width: 20vw;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: space-around;
  flex-direction: column;
  justify-content: center;
  color: #808080;
  @media (max-width: 400px) {
    width: 70vw;
    height: 10vh;
    display: flex;
    flex-direction: column;
  }
`


const DashBoard = () => {
  return (
    <>
      <HeaderComponent>
        <RectangleBox>
          <h3>Total Farmers: </h3>
        </RectangleBox>
        <RectangleBox>
          <h3>Date Survey: </h3>
        </RectangleBox>
        <RectangleBox>
          <h3>Area Survey: </h3>
        </RectangleBox>
      </HeaderComponent>
      <PieCharts>
      <PieChart
        style={{'margin': '0'}}
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
            cx: 60,
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
            cx: 60,
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