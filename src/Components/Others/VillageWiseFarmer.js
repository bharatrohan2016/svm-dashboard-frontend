import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CategoryScale,BarElement,LinearScale, Chart} from 'chart.js'; 
import { getVillageWiseFarmerCount } from '../../Service/api';
Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);

const VillageWiseFarmer = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
	getVillageWiseFarmerCount().then((response) => {
		console.log(response);
		const labels = response.map((item) => item._id);
		setLabels(labels)

		const data = response.map((item) => (item.count));
		setData(data)
	}).catch((error) => {
		console.log(error);
	})
  },[])

  return (
	
	<Bar 
             
		options={{
		responsive: true,
		plugins: {
			datalabels: {
				display: true,
				color: "black",
				formatter: (value, context) => {  return `${value} farmers`  },
				anchor: "end",
				align: "end",
				textStrokeWidth  : 0.6
			},
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Bar Chart Shows about each crop services taken by different farmers',
				position : 'top'
			},
		},
	}} 
	
	data={{
		labels : labels,
		datasets: [
			{
			label: 'Number of Farmers',
			data,
			backgroundColor: ['#e8ba3a','#769f34'],
			borderWidth : 2,
			borderColor : 'black'
			}
		],
	}}
  
  plugins={[ChartDataLabels]}
	/>


  )
}

export default VillageWiseFarmer