import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";

const IncidentByType = (props) => {
  //getting data for Critical Incident table and Major Incident table
  const [majorBarchartData] = useState([]);
  const [majorBarchartLabel] = useState([]);
  const [criticalBarchartData] = useState([]);
  const [criticalBarchartLabel] = useState([]);

  return (
    <Row>
      {/* Major Incident By Type */}
      <Col lg="6">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h3">
              <i className="tim-icons icon-alert-circle-exc text-primary" />{" "}
              Major Incident By Type
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar
                data={(canvas) => {
                  let ctx = canvas.getContext("2d");

                  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                  gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                  gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

                  return {
                    //the chart label
                    labels: majorBarchartLabel,
                    datasets: [
                      {
                        label: "Count",
                        fill: true,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: gradientStroke,
                        borderColor: "#d048b6",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        //the chart data
                        data: majorBarchartData,
                      },
                    ],
                  };
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false, // Hides the legend
                    },
                  },

                  tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                  },
                  responsive: true,
                  scales: {
                    y: {
                      grid: {
                        display: true,
                        color: "rgba(225,78,202,0.1)",
                        borderColor: "transparent",
                        borderDash: [],
                      },
                      ticks: {
                        padding: 10,
                        color: "#9e9e9e",
                        beginAtZero: true,
                      },
                    },
                    xAxes: [
                      {
                        gridLines: {
                          drawBorder: false,
                          color: "rgba(225,78,202,0.1)",
                          zeroLineColor: "transparent",
                        },
                        ticks: {
                          padding: 20,
                          fontColor: "#9e9e9e",
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Critical Incident By Type */}
      <Col lg="6">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h3">
              <i className="tim-icons icon-alert-circle-exc text-info" />
              Critical Incident By Type
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar
                data={(canvas) => {
                  let ctx = canvas.getContext("2d");

                  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                  gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                  gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

                  return {
                    //chart labels
                    labels: criticalBarchartLabel,
                    datasets: [
                      {
                        label: "Count",
                        fill: true,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: gradientStroke,
                        borderColor: "#d048b6",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        //chart data
                        data: criticalBarchartData,
                      },
                    ],
                  };
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                  },
                  responsive: true,
                  scales: {
                    y: {
                      grid: {
                        display: true,
                        color: "rgba(225,78,202,0.1)",
                        borderColor: "transparent",
                        borderDash: [],
                      },
                      ticks: {
                        padding: 10,
                        color: "#9e9e9e",
                        beginAtZero: true,
                      },
                    },
                    xAxes: [
                      {
                        gridLines: {
                          drawBorder: false,
                          color: "rgba(225,78,202,0.1)",
                          zeroLineColor: "transparent",
                        },
                        ticks: {
                          padding: 20,
                          fontColor: "#9e9e9e",
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default IncidentByType;
