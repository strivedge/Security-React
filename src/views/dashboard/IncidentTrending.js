import moment from "moment";
import { VulnerTaskData } from "../sampleData/mockData";
import Chart from "react-apexcharts";
import React from "react";

function IncidentTrending() {
  let siemTrending = [];
  VulnerTaskData.SIEMTending.forEach((data) => {
    var arr = [];
    let date = moment(data["Time"], "YYYY-MM-DD").format("x");
    arr.push(parseInt(date));
    arr.push(data["Alert"]);
    siemTrending.push(arr);
  });

  const siemTrendingOptions = {
    series: [
      {
        name: "Incident",
        data: siemTrending,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
        style: {
          colors: "#aab8c5",
          fontSize: "12px",
        },
      },
      title: {
        text: "# of Incidents",
        style: {
          fontWeight: 450,
          color: "#aab8c5",
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#aab8c5",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(128, 128, 128, 0.3)",
    },
  };

  return (
    <>
      <Chart
        options={siemTrendingOptions}
        series={siemTrendingOptions.series}
        type="area"
        height="350"
        stacked="false"
      />
    </>
  );
}

export default IncidentTrending;
