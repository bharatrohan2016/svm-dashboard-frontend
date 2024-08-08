import { Box, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SelectYear = () => {
    const MainBox = styled(Box)`
        display: flex;
        height: 100vh;
        width: 100vw;
        justify-content: space-evenly;
        align-items: center;
        @media (max-width: 480px) {
            flex-direction: column;
            align-items: center;
        }
    `;

    const OptionBox = styled(Box)`
        display: flex;
        height: 200px;
        width: 500px;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: #242B4D;
        color: #fff;
        @media (max-width: 480px) {
            height: 150px;
            width: 300px;
        }
    `

    const navigate = useNavigate()
  return (
    <MainBox>
        <OptionBox onClick={() => {navigate('/dashboard')}}>
            <h1>2023</h1>
        </OptionBox>
        <OptionBox onClick={() => {navigate('/other-dashboard')}}>
            <h1>Others</h1>
        </OptionBox>
    </MainBox>
  )
}

export default SelectYear