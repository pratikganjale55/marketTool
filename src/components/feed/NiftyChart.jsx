import React, { useContext } from "react";
import niftyData from "../../assets/data/niftyData";
import arNiftyData from "../../assets/data/arNiftyData";
import { PolarArea } from "react-chartjs-2";
import { CompanyContext } from "../context/CompanyProvider";

const NiftyChart = () => {
  const { changeLang } = useContext(CompanyContext);
  const label = (changeLang ? arNiftyData : niftyData).map((item) => item.name);
  const prices = (changeLang ? arNiftyData : niftyData).map(
    (item) => item.price
  );
  const polarChartData = {
    labels: label,
    datasets: [
      {
        label: "Price",
        data: prices,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  const polarChartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
    angleLines: {
      display: true,
    },
  };

  const polarChartConfig = {
    type: "polarArea",
    data: polarChartData,
    options: polarChartOptions,
  };
  return (
    <>
      <h3 className="text-center"> {changeLang ? "أنيق 50" : "NIFTY 50"} </h3>
      <PolarArea data={polarChartData} options={polarChartConfig} />
    </>
  );
};

export default NiftyChart;
 
