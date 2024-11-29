import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import React from 'react'
//  '#8a812c', '#8dbe3f', '#e8ba3a', '#578019', '#9a693d'
const CropPieChart = ({cropWiseData}) => {
  
	return (
	<PieChart 
          series={[
            {
              data: [
                { id: 0, value: cropWiseData.ginger, label: 'Ginger', color : '#578019'},
                { id: 1, value: cropWiseData.paddy, label: 'Paddy', color : '#e8ba3a' },
                // { id: 2, value: 20, label: 'No Phone', labelPosition: 95 }, '#8a812c', '#8dbe3f', '#e8ba3a', '#578019', '#9a693d'
              ],
              arcLabel: (item) => `${item.label} (${item.value})`,
              cx: 70,
              arcLabelMinAngle: 45,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'black',
              fontWeight: 'bold',
              fontSize: '12px',
              textAnchor: 'center'
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
  );
}

export default CropPieChart