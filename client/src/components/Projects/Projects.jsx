import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Form from 'react-bootstrap/Form';
import { Data } from "./Data";

function Projects() {
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container fluid className="project-section">
      <Particle />


        <Container >
          <div>
            <h1 className="project-heading">
              My Recent <strong className="purple">Works </strong>
            </h1>
            <p style={{ color: "white" }}>
              Here are a few projects I've worked on recently.
            </p>
          </div>
          <div className="">
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Col md={3} style={{ position: "relative", marginLeft: "auto" }}>
                <Form.Select className="select" onChange={handleCategoryChange} aria-label="Default select example">
                  <option value="all">Category</option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="ds">Data | AI</option>
                </Form.Select>
              </Col>
            </div>

            <Row style={{ justifyContent: "flex-start", paddingBottom: "10px" }}>
              {category === "all"
                ? Data.projects.map((item) => (
                  <Col md={6} lg={4} className="project-card" key={item.title}>
                    <ProjectCard
                      imgPath={item.imgPath}  // Dinamik resim yolu
                      title={item.title}
                      description={item.description.length>150 ? item.description.slice(0,150)+"...": item.description}
                      link={item.link}
                      platform={item.platform}
                      category={item.category}
                    />
                  </Col>
                ))
                : Data.projects
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <Col md={4} className="project-card" key={item.title}>
                      <ProjectCard
                        imgPath={item.imgPath}  // Dinamik resim yolu
                        title={item.title}
                        description={item.description}
                        link={item.link}
                        platform={item.platform}
                        category={item.category}
                      />
                    </Col>
                  ))}
            </Row>
          </div>
        </Container>

    </Container>
  );
}

export default Projects;
