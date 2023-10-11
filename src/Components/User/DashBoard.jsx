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
  color: #808080
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
      <HeaderComponent>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
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
          },
        ]}
        width={400}
        height={200}
      />
      </HeaderComponent>
      <HeaderComponent>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={500}
          height={300}
        />
      </HeaderComponent>
    </>
  )
}

export default DashBoard