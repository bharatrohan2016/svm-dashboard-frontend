import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { styled } from '@mui/system';

const Section = styled('section')({
  padding: '26px',
  marginBottom: '26px',
  backgroundColor: '#f7f7f7',
  borderLeft : '3px solid #333955 !important',
  borderTop : '3px solid #333955',
  textAlign : 'left',
  borderRadius : '60px 0px 60px 0px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
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


const OtherAbout = () => {
  return (
    <Stack >
      
      <Section  sx={{textAlign : 'left'}}>
        <Typography variant="h5" gutterBottom>
          About BharatRohan
        </Typography>
        <MainBox>
          <div className='row' style={{display :'flex', justifyContent : 'space-between'}}>
            <div className='col-md-9'>
              BharatRohan is an agri-tech start-up specializing in UAV/drone spectral imaging-based Decision Support System (DSS) for farmers. They offer a comprehensive procurement platform to institutional buyers with traceability as a key value addition. The solution is vertically integrated and offers farmers and FPOs access to the markets through buyback arrangements. The value proposition for paying customers is access to pesticide and residue-free agricultural commodities, along with a farm-traceability platform. The company is tapping into the export market demand, which can offer higher margins to the farmer. For more information, visit{' '}
              <a href="http://www.bharatrohan.com/" target="_blank" rel="noopener noreferrer">
                http://www.bharatrohan.com/
              </a>
              <br/> <br/>
              BharatRohan empowers Indian agriculture industry with an extraordinary in-depth understanding of land and crops by using unique UAV/drone based hyperspectral remote sensing and artificial intelligence. They transform data from the cameras into actionable informational which makes techniques like precision agriculture, integrated pest management and contract farming real and viable. They collaborate with different companies in contract farming to provide pesticide residue-free seeds and other agri-commodities from farmers' fields. Moreover, they are an end-to-end information support system for their contract farming customers regarding traceability and source of procurement.
            </div>
            <div className='col-md-3' style={{textAlign:'center', display : 'flex', alignItems : 'center'}}>
            <Img style={{height : '35vh',width : '100%'}} component='img' src='/BharatRohan_Logo.jpg'/> <br/>
            </div>
          </div>
        </MainBox>
      </Section>

      <Section sx={{textAlign : 'left'}}>
        <Typography variant="h5" gutterBottom>
          About SVM
        </Typography>
        <MainBox>
          <div className='row' style={{display :'flex', justifyContent : 'space-between'}}>
            <div className='col-md-5 col-xl-5 mb-2' style={{display:'flex', alignItems : 'center', justifyContent:'center'}}>
              <Img component='img' style={{width : '90%', height : '10vh'}} src='/svm_logo.png'/>
            </div> 
            <div className='col-md-7 col-xl-7 mb-2'>
            The Smart Village Movement is a collaborative process facilitated by the SVM organization in conjunction with the Berkeley-Haas Center of Growth Markets, aimed at establishing a Smart Village ecosystem. The organization actively partners with government, academia, corporations, and rural communities, fostering independence and promoting sustainable rural development in Indian villages and other emerging markets. Its primary objective is to empower rural communities by leveraging digital technologies and open innovation platforms, thereby enabling them to access global markets.
            </div>
          </div>
        </MainBox>
      </Section>


      <Section sx={{textAlign : 'left'}}>
        <Typography variant="h5" gutterBottom>
          Testimonials
        </Typography>
        <div className='row'>
          <div className='col-md-4 mb-2 text-center'>
          <Img style={{'height': '35vh',width : '90%', 'borderRadius': '10px'}} component='img' src='/About_3.jpg'/>
          </div>
          <div className='col-md-4 mb-2 text-center'>
          <Img style={{'height': '35vh',width : '90%',  'borderRadius': '10px'}} component='img' src='/About_2.jpg'/>
          </div>
          <div className='col-md-4 mb-2  text-center'>
          <Img style={{'height': '35vh',width : '90%',  'borderRadius': '10px'}} component='img' src='/About_1.jpg'/>
          </div>
        </div>
            
      </Section>
     
    </Stack>
  );
};

export default OtherAbout;
