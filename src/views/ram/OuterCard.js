import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import Chart from "react-apexcharts";
import RiskByScoreDoughnutChart from "./RiskByScoreDoughnutChart";

const OuterCard = () => {
  const projectReactChartOption = {
    options: {
      chart: {
        id: "area",
      },
      xaxis: {
        labels: {
          style: {
            colors: "rgba(158, 158, 158)",
            fontSize: "12px",
          },
        },
        categories: [
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
          "2022 Jan",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "rgba(158, 158, 158)",
            fontSize: "12px",
          },
        },
      },
      colors: ["#E91E63", "#5ff436"],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "rgba(158, 158, 158, 0.3)",
        strokeDashArray: 0,
      },
      legend: {
        labels: {
          colors: ["rgba(255,255,255, 0.8)", "rgba(255,255,255, 0.8)"],
        },
      },
    },
    series: [
      {
        name: "Tasks Remaining ",
        data: [38, 35, 38, 32, 23, 19, 13, 14],
      },
      {
        name: "Tasks Completion",
        data: [9, 8, 8, 7, 4, 4, 3, 3],
      },
    ],
  };
  return (
    <Row>
      <Col lg="6">
        <Card className="p-3">
          <CardHeader className="d-flex justify-content-between p-0 border-bottom">
            <CardTitle tag="h3">Tasks status in the past</CardTitle>
          </CardHeader>
          <CardBody>
            <Chart
              options={projectReactChartOption.options}
              series={projectReactChartOption.series}
              type="area"
              height="270"
            />
          </CardBody>
        </Card>
      </Col>

      <Col lg="6">
        <Card className="p-3">
          <CardHeader className="d-flex justify-content-between p-0 border-bottom">
            <CardTitle tag="h3">Tasks by Risk level</CardTitle>
          </CardHeader>
          <CardBody>
            <RiskByScoreDoughnutChart />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default OuterCard;
