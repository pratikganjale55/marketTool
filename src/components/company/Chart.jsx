import React, { useContext, useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import{Chart as ChartJS} from "chart.js/auto" ;
import { CompanyContext } from '../context/CompanyProvider';
import axios from 'axios';




const Chart = ({statement}) => {
  
 
  const years = statement.map(item => item.year);
  const netIncomes = statement.map(item => item.net_income);
  const  profit = statement.map((item) => item.revenue)

  
 
   
  
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Net Income',
        data: netIncomes,
        fill: false,
       
        backgroundColor : "#4682A9"
      },
      {
        label: 'Profit',
        data: profit,
        fill: false,
       
        backgroundColor : "#91C8E4"
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
         
          title: {
            display: true,
            text: 'Year',
          },
        },
      ],
      yAxes: [
        {
          
          title: {
            display: true,
            text: 'Net Income',
          },
        },
      ],
    },
  };
  return <Bar data={chartData} options={chartOptions}/>
}

export default Chart
