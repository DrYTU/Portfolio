import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";
import { FaKaggle } from "react-icons/fa";

function ProjectCards(props) {

  return (
    <Card className="project-card-view">
      <Card.Img style={{  objectFit: "contain" }} className="project-card-image p-3 pb-1 rounded-4" variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body >
        <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ fontSize: 14, marginTop:24 }}>
            {props.description}
          </Card.Text>
        {props.platform === "Kaggle" ?
          (<Button variant="primary" href={props.link} target="_blank">
            <FaKaggle /> Kaggle
          </Button>) :

          (<Button variant="primary" href={props.link} target="_blank">
            <BsGithub /> GitHub
          </Button>)}

        {"\n"}
        {"\n"}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
