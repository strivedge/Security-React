import React from "react";
import { RAMData } from "views/sampleData/mockData";
import { Col, Row } from "reactstrap";
import OuterCard from "./OuterCard";
import GeneralCard from "./GeneralCard";
import { useNavigate } from "react-router-dom";

const RiskAssessmentMethod = () => {
  const data = RAMData.RAMTableData;
  const navigate = useNavigate();

  const handleProductClick = function (id) {
    navigate("./ProjectDetails", {
      state: {
        data: RAMData.RAMTableData,
        displayID: id,
      },
    });
  };

  return (
    <div className="content">
      <Row>
        <Col lg="12">
          <OuterCard data={data} />
        </Col>

        <Col md="12" lg="12">
          <GeneralCard setDisplayID={handleProductClick} />
        </Col>
      </Row>
    </div>
  );
}

export default RiskAssessmentMethod;
