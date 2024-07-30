import moment from "moment";
import { VulnerTaskData } from "../sampleData/mockData";
import Chart from "react-apexcharts";
import React from "react";

function VulnerTrending() {
  var highVulnerTrending = [];
  var medVulnerTrending = [];
  var lowVulnerTrending = [];
  var datetimeVulnerTrending = [];
  VulnerTaskData.Trending.forEach((data) => {
    switch (data["Severity"]) {
      case "High":
        highVulnerTrending.push(data["Vulnerabilities"]);
        break;
      case "Medium":
        medVulnerTrending.push(data["Vulnerabilities"]);
        break;
      default:
        lowVulnerTrending.push(data["Vulnerabilities"]);
        break;
    }
    const time = moment(data["Timestamp"], "MMMM YYYY").format("MMM YY");
    if (datetimeVulnerTrending.indexOf(time) === -1) {
      datetimeVulnerTrending.push(time);
    }
  });
  const vunlerTrendingOptions = {
    colors: ["#ce454f", "#d1ac0f", "#646464"],
    opacity: "1",
    series: [
      {
        name: "High",
        data: highVulnerTrending,
      },
      {
        name: "Medium",
        data: medVulnerTrending,
      },
      {
        name: "Low",
        data: lowVulnerTrending,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: "true",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    stroke: {
      width: 0,
      colors: ["#fff"],
    },

    yaxis: {
      labels: {
        style: {
          colors: "#aab8c5",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
      labels: {
        colors: "#aab8c5",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#e0e0e0"],
      },
      formatter: function (val) {
        return val >= 25 ? val : "";
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(128, 128, 128, 0.3)",
    },
  };

  return (
    <>
      {" "}
      <Chart
        options={vunlerTrendingOptions}
        series={vunlerTrendingOptions.series}
        type="bar"
        height="350"
        stacked="true"
      />
    </>
  );
}

export default VulnerTrending;
