import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/ben.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              WHO <span className="purple"> I AM </span>  ?
            </h1>
            <p className="home-about-body">
              I am a first year C.E. student at Yıldız Technical University
              <br />
              <br />I am currently working on
              <i>
                <b className="purple"> React, NodeJS and React Native. </b>
              </i>
              <br />
              <br />
              My main area of ​​expertise are
              <i>
                <b className="purple">Web & Mobile Technologies </b>, but i also have a bit of interest in {" "}
                <b className="purple">
                  Data Science & Machine Learning
                </b>

              </i>
              <br />
              <br />
              I am <b className="purple">determined</b>  to improve myself to building the projects that i dream. To check what i do, You can have a look at  <b className="purple">my projects page</b>
              
            </p>
          </Col>
          <Col md={4} className="myAvtar2">
            <Tilt glareEnable={true} glareBorderRadius={"8%"}

            glareColor="#fff" glareMaxOpacity={0.7}>
              <img src={myImg} style={{borderRadius:30}} className="img-fluid" alt="ben2" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/drytu"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/necip-arda-kocabaş-b139462a0/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/necipardaaa/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
