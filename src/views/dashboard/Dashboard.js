// ** React Imports
import React, { useState } from "react";

// ** Reactstrap Imports
import {
  Col,
  Row,
  Card,
  Table,
  Button,
  Progress,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  ButtonGroup,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

// ** Third Party Components
import moment from "moment";
import { Bar } from "react-chartjs-2";

import Sixlayers from "./SixLayers.js";
import ReactApexChart from "react-apexcharts";
import VulnerTrending from "./VulnerTrending.js";
import IncidentByType from "./IncidentByType.js";
import IncidentTrending from "./IncidentTrending.js";

import { ManagementTaskData } from "../sampleData/mockData.js";
import { CisSubControlHistoryData } from "../sampleData/ComplianceControlData.js";

const Dashboard = () => {
  const generalData = CisSubControlHistoryData;
  const [dashboardView, setDashboardView] = useState("cyberRisk");

  let now = new moment().subtract(2, "minutes").format("lll");
  const lastIntelDate = now.toString();

  //getting data for Critical Incident table and Major Incident table
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const token = userToken?.token;

  const budgetTaskChartOptions = {
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
          padding: 20,
          color: "#9e9e9e",
          beginAtZero: true,
        },
      },
      x: {
        grid: {
          display: true,
          color: "rgba(225,78,202,0.1)",
          borderColor: "transparent",
          borderDash: [],
        },
        ticks: {
          padding: 20,
          color: "#9e9e9e",
        },
      },
    },
  };

  function ScoreHistoryLineChart(props) {
    let categories = [];
    let values = [];
    props.data.forEach((element) => {
      categories.push(element.name);
      values.push(element.value);
    });

    const options = {
      annotations: {
        yaxis: [
          {
            y: 93,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              offsetX: -500,
              offsetY: 6,
              style: {
                color: "#0042da",
                background: "#00E396",
                cssClass: "apexcharts-yaxis-annotation-label",
                padding: {
                  left: 5,
                  right: 5,
                  top: 0,
                  bottom: 0,
                },
              },
              text: "Industry Average",
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        show: true,
        borderColor: "rgba(128, 128, 128, 0.3)",
      },
      theme: {
        palette: "palette1",
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: "#aab8c5",
            fontSize: "12px",
          },
          rotate: -45,
          rotateAlways: true,
        },
      },
      yaxis: {
        title: {
          text: "Program Score (%)",
          style: {
            fontWeight: 450,
            color: "#aab8c5",
          },
        },
        labels: {
          style: {
            colors: "#aab8c5",
          },
        },
      },
    };

    let series = [
      {
        data: values,
      },
    ];

    return (<>
      <ReactApexChart
        options={options}
        type="line"
        series={series}
        height={props.height}
      />
    </>);
  }

  return (
    <div className="content">
      <Row className="justify-content-center">
        <ButtonGroup className="btn-group-toggle center" data-toggle="buttons">
          <Button
            color="default"
            id="0"
            size="sm"
            tag="label"
            className={`btn-simple ${dashboardView === "executive" ? "active" : ""
              }`}
            onClick={() => setDashboardView("executive")}
          >
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Executive
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-single-02" />
            </span>
          </Button>

          <Button
            color="default"
            id="1"
            size="sm"
            tag="label"
            className={`btn-simple ${dashboardView === "governance" ? "active" : ""
              }`}
            onClick={() => setDashboardView("governance")}
          >
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Governance
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-gift-2" />
            </span>
          </Button>

          <Button
            color="default"
            id="2"
            size="sm"
            tag="label"
            className={`btn-simple ${dashboardView === "cyberRisk" ? "active" : ""
              }`}
            onClick={() => setDashboardView("cyberRisk")}
          >
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              CyberRisk
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-gift-2" />
            </span>
          </Button>
        </ButtonGroup>
      </Row>
      <br />

      <Col lg="13">
        <Row>
          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Log Processed</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        178GB
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-refresh-01" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Traffic Monitored</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        1.82TB
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-sound-wave" /> Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Protected Devices</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        265
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-sound-wave" /> Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Last Threat Intel</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        {lastIntelDate}
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-refresh-01" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Blocked Traffic</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        98k
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-sound-wave" /> Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="2" md="6" style={{ display: "flex", maxHeight: "270px" }}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="12">
                    <div>
                      <p className="card-category">Incidents</p>
                      <CardTitle tag="h3" style={{ fontSize: "1.75rem" }}>
                        2
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div
                  className="stats"
                  style={{
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <i className="tim-icons icon-sound-wave" /> Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Col>

      <Row>
        <Col lg="6">
          <Sixlayers />
        </Col>
        <Col lg="6">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h3">
                <i className="tim-icons icon-alert-circle-exc text-primary" />
                Vulnerabilities Trending
              </CardTitle>
            </CardHeader>
            <CardBody>
              <VulnerTrending />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {dashboardView === "governance" || dashboardView === "executive" ? (
        <Row>
          {/*Management Table*/}
          <Col lg="6">
            <Card className="db-mid-section">
              <CardHeader>
                <div className="tools float-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                      <DropdownItem
                        className="text-danger"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Remove Data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <CardTitle tag="h5">Management Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Task Name</th>
                      <th>PM</th>
                      <th>Projected End Date</th>
                      <th>Milestone</th>
                      <th className="text-right">Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ManagementTaskData.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{val.Index}</td>
                          <td>{val.TaskName}</td>
                          <td>{val.Owner}</td>
                          <td>{val.ProjectedDate}</td>
                          <td>
                            <div className="progress-container progress-sm">
                              <Progress multi>
                                <Progress bar max="100" value={val.Milestone} />
                              </Progress>
                              <span
                                className="progress-value"
                                style={{ fontSize: "0.62475rem" }}
                              >
                                {val.Milestone} %
                              </span>
                            </div>
                          </td>
                          <td className="text-right">${val.Spent}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Projected Budget by Task */}
          <Col lg="6">
            <Card className="card-chart db-mid-section">
              <CardHeader>
                <h5 className="card-category">Projected Budget by Task</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-coins text-primary" /> $776K
                </CardTitle>
              </CardHeader>

              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={(canvas) => {
                      console.log(canvas);
                      let ctx = canvas.getContext("2d");
                      let gradientStroke = ctx.createLinearGradient(
                        0,
                        230,
                        0,
                        50
                      );
                      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

                      return {
                        //the chart label
                        labels: ["CIS", "SIEM", "VAS", "IPDF", "Pentest"],
                        datasets: [
                          {
                            label: "Budget",
                            fill: true,
                            backgroundColor: gradientStroke,
                            hoverBackgroundColor: gradientStroke,
                            borderColor: "#d048b6",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            //the chart data
                            data: [10000, 15000, 25000, 1600, 26000],
                          },
                        ],
                      };
                    }}
                    options={budgetTaskChartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}

      {dashboardView === "cyberRisk" ? (
        <>
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-alert-circle-exc text-primary" />
                    CIS Score Trending
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ScoreHistoryLineChart
                    data={generalData.history.data.progress_by_month}
                    height="350px"
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-alert-circle-exc text-primary" />
                    SIEM Incident Trending
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <IncidentTrending token={token} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <IncidentByType />
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
