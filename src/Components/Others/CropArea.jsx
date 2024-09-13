
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import React from 'react'
//  '#8a812c', '#8dbe3f', '#e8ba3a', '#578019', '#9a693d'

const CropArea = () => {
  
  return (
	<PieChart 
          series={[
            {
              data: [
                { id: 0, value: (556984/4046.86), label: 'Ginger', color : '#8dbe3f'},
                { id: 1, value: (607683/4046.86), label: 'Paddy', color : '#578019' },
                // { id: 2, value: 20, label: 'No Phone', labelPosition: 95 }, '#8a812c', '#8dbe3f', '#e8ba3a', '#578019', '#9a693d'
              ],
              arcLabel: (item) => `${item.value.toFixed(2)} Acres`,
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
  )
}

export default CropArea