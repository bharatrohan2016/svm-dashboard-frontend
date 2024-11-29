import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CategoryScale,BarElement,LinearScale, Chart} from 'chart.js'; 
import { getVillageWiseArea } from '../../Service/api';
Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);


const VillageAreaChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
	getVillageWiseArea().then((response) => {
		
		const labels = response.map((item) => item.village);
		setLabels(labels)

		const data = response.map((item) => (item.totalArea/4046.86).toFixed(2));
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
				formatter: (value, context) => {  return `${value} Acres`  },
				anchor: "end",
				align: "end",
				textStrokeWidth  : 0.6,

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
			label: 'Villages',
			data ,
			backgroundColor: ['#d18a49','#e8ba3a'],
			borderWidth : 2,
			borderColor : 'black'
			}
		],
	}} 
	plugins={[ChartDataLabels]}/>


  )
}

export default VillageAreaChart