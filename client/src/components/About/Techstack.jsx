import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,

} from "react-icons/di";
import { SiHtml5, SiCss3, SiBootstrap } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiHtml5 />
        <Row>
          <span className="fs-6" >HTML5</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCss3 />
        <Row>
          <span className="fs-6" >CSS3</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiBootstrap />
        <Row>
          <span className="fs-6" >Bootstrap</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
        <Row>
          <span className="fs-6" >JavaScript</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
        <Row>
          <span className="fs-6" >ReactJS</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandReactNative />
        <Row>
          <span className="fs-6" >React Native</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
        <Row>
          <span className="fs-6" >NodeJS</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMongodb />
        <Row>
          <span className="fs-6" >MongoDB</span>
        </Row>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
        <Row>
          <span className="fs-6" >Python</span>
        </Row>
      </Col>
    </Row>
  );
}

export default Techstack;
