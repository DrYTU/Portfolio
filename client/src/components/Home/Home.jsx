import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Tilt from "react-parallax-tilt";
import myImg from "../../Assets/ben2.jpg";

function Home() {
  
  const [titles, setTitles] = useState();
  
  useEffect(() => {

    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/contents/get-all', {
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
    setTitles(data.titles || "");
  }

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'm
                <strong className="main-name"> Necip Arda Kocabaş</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type titles={titles} />
              </div>
            </Col>

            <Col sm={12} md={5} style={{ paddingBottom: 20 }} className="myAvtar1">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <img src={myImg} className="img-fluid rounded-pill" alt="ben1" />
              </Tilt>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
