import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import { RAMData } from "../sampleData/mockData";
import { FrappeGantt, ViewMode } from "frappe-gantt-react";
import React from "react";
import "../../assets/customcss/customWork.css";

function GeneralCard(props) {
  let handleID = function (id) {
    props.setDisplayID(id);
  };

  const tasks = [
    {
      id: "1",
      name: "Review Ordering system contract ",
      start: new Date(2022, 3, 1),
      end: new Date(2022, 5, 21),
      progress: 34,
      dependencies: "",
    },
    {
      id: "2",
      name: "Review SIEM Tools",
      start: new Date(2022, 5, 1),
      end: new Date(2022, 7, 14),
      progress: 20,
      dependencies: "1",
    },
    {
      id: "3",
      name: "Deploy Pentest system in Tokyo",
      start: new Date(2022, 4, 1),
      end: new Date(2022, 6, 14),
      progress: 0,
      dependencies: "",
    },
    {
      id: "4",
      name: "Annual Compliance Audit",
      start: new Date(2022, 6, 1),
      end: new Date(2022, 8, 30),
      progress: 0,
      dependencies: "3",
    },
  ];

  return (
    <>
      <Row>
        <Col lg="12" md="12">
          <Card className="p-3">
            <CardHeader className="d-flex justify-content-between p-0  border-bottom">
              <CardTitle tag="h3">Scheduled Projects</CardTitle>
              <hr />
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Priority</th>
                    <th>Project description</th>
                    <th>Impact scope</th>
                    <th className="text-center">Affected Score %</th>
                    <th className="text-center">Risk Likelihood</th>
                    <th className="text-center">Cost of the Risk</th>
                    <th className="text-center">Projected Cost to Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {RAMData.RAMTableData.map((val, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ display: "table-row" }}
                        onClick={(e) => handleID(val.ID)}
                      >
                        <td style={{ cursor: "pointer" }}>{val.Priority}</td>
                        <td style={{ cursor: "pointer" }}>
                          {val.ProjectTitle}
                        </td>
                        <td style={{ cursor: "pointer" }}>{val.ImpactScope}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          {val.AffectedScore}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          {val.RiskLikelihood}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          {val.CostOfRisk}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          {val.ProjectedCost}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Button size="sm">Add New Projects</Button>

              <ButtonGroup
                className="btn-group-toggle pull-right "
                data-toggle="buttons"
              >
                <Button id="0" size="sm" className="mr-2">
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block ">
                    Day
                  </span>
                </Button>
                <Button id="1" size="sm" className="mr-2">
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Month
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
                <Button id="1" size="sm">
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Year
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
              </ButtonGroup>
              <div className="py-4">
                <FrappeGantt
                  tasks={tasks}
                  onClick={(task) => console.log(task, "click")}
                  onDateChange={(task, start, end) =>
                    console.log(task, start, end, "date")
                  }
                  onProgressChange={(task, progress) =>
                    console.log(task, progress, "progress")
                  }
                  onTasksChange={(tasks) => console.log(tasks, "tasks")}
                  viewMode={ViewMode.Month}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

//
export default GeneralCard;
