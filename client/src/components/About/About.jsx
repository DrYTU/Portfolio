import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import ben3 from "../../Assets/ben3.jpg";
import Toolstack from "./Toolstack";
import WhatIDid from "./WhatIDid";
import Tilt from "react-parallax-tilt";


function About() {

  const [github, setGithub] = useState();
  const [kaggle, setKaggle] = useState();
  const [quote, setQuote] = useState();
  const [quoteOwner, setQuoteOwner] = useState();

  
  useEffect(() => {

    const token = localStorage.getItem('token');

    fetch(process.env.REACT_APP_SERVER_URL + '/api/contents/get-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        handleData(data[data.length - 1])
      })
      .catch(error => console.error('Error:', error));


  }, []);

  const handleData = (data) => {
    setGithub(data.github || "");
    setKaggle(data.kaggle || "");
    setQuote(data.quote || "");
    setQuoteOwner(data.quoteOwner || "");
  }

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              WHO <strong className="purple">I AM</strong>
            </h1>
            <Aboutcard quote={quote} quoteOwner={quoteOwner}/>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "50px", paddingBottom: "100px" }}
            className="about-img"
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} >
                <img src={ben3} className="img-fluid rounded-circle" alt="ben1" style={{width:"100%", objectFit:"cover"}} />
              </Tilt>
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />
        <h1 className="project-heading mb-5">
          <strong className="purple">What</strong> I did
        </h1>
        <WhatIDid github={github} kaggle={kaggle}/>
      </Container>
    </Container>
  );
}

export default About;
