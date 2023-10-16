import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const Section = styled('section')({
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

const MainBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  '@media (max-width: 400px)': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const Img = styled(Box)({
  '@media (max-width: 400px)': {
    width: '80vw',
    height: '20vh'
  },
})


const About = () => {
  return (
    <Container maxWidth="lg">
      <Section>
        <Typography variant="h4" gutterBottom>
          About BharatRohan
        </Typography>
        <MainBox>
          <Typography variant="body1">
            BharatRohan is an agri-tech start-up specializing in UAV/drone spectral imaging-based Decision Support System (DSS) for farmers. They offer a comprehensive procurement platform to institutional buyers with traceability as a key value addition. The solution is vertically integrated and offers farmers and FPOs access to the markets through buyback arrangements. The value proposition for paying customers is access to pesticide and residue-free agricultural commodities, along with a farm-traceability platform. The company is tapping into the export market demand, which can offer higher margins to the farmer. For more information, visit{' '}
            <a href="http://www.bharatrohan.com/" target="_blank" rel="noopener noreferrer">
              http://www.bharatrohan.com/
            </a>
          </Typography>
          <Img style={{'height': '30vh',  'width': '100%', 'borderRadius': '10px'}} component='img' src='/About_1.jpg'/>
        </MainBox>
      </Section>

      <Section>
        <Typography variant="h4" gutterBottom>
          About Smart Village Movement
        </Typography>
        <MainBox>
          <Img style={{'height': '30vh',  'width': '100%', 'borderRadius': '10px'}} component='img' src='/About_2.jpg'/>
          <Typography variant="body1">
            The Smart Village Movement is a collaborative process facilitated by the SVM organization in conjunction with the Berkeley-Haas Center of Growth Markets, aimed at establishing a Smart Village ecosystem. The organization actively partners with government, academia, corporations, and rural communities, fostering independence and promoting sustainable rural development in Indian villages and other emerging markets. Its primary objective is to empower rural communities by leveraging digital technologies and open innovation platforms, thereby enabling them to access global markets.
          </Typography>
        </MainBox>
      </Section>
      <Box style={{'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center'}}>
        <Img style={{'height': '30%',  'width': '30%', 'borderRadius': '10px'}} component='img' src='/About_3.jpg'/>
        <i>Educating Farmers for better future.</i>
      </Box>
    </Container>
  );
};

export default About;
