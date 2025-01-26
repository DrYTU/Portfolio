import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaGithub, FaKaggle } from "react-icons/fa";

function WhatIDid({ github, kaggle }) {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px", rowGap:55 }}>
            <Col xs={12} md={4} style={{ position: "relative", textAlign: "center" }}>
                <div className="project-card-wrapper" style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "-30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#000",
                            border: "2px solid white",
                            borderRadius: "50%",
                            padding: "10px",
                            transition: "all 0.5s ease",
                            zIndex: 1,  // İkonun üstte kalmasını sağlamak için eklendi
                        }}
                        className="kaggle-icon"
                    >
                        <FaGithub size={"2.5em"} />
                    </div>
                    <div
                        style={{
                            border: "2px solid #000",
                            background: "transparent",
                            borderRadius: "12px",
                            padding: "40px 20px 20px 20px",
                            color: "white",
                            boxShadow: "0 0 5px 3px rgba(119, 53, 136, 0.459)",
                            opacity: "0.9",
                            transition: "all 0.5s ease",
                            height: "100%",
                        }}
                        className="project-card-view2"
                    >
                        <div style={{ fontSize: "1.5em", marginBottom: "10px" }}>
                            GitHub Repos :
                        </div>
                        <Row style={{ justifyContent: "center", fontSize: "4em" }}>
                            {github}
                        </Row>
                    </div>
                </div>
            </Col>

            <Col xs={12} md={4} style={{ position: "relative", textAlign: "center" }}>
                <div className="project-card-wrapper" style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "-30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#1face6",
                            border: "2px solid white",
                            borderRadius: "50%",
                            padding: "10px",
                            transition: "all 0.5s ease",
                            zIndex: 1,  // İkonun üstte kalmasını sağlamak için eklendi
                        }}
                        className="kaggle-icon"
                    >
                        <FaKaggle size={"2.5em"} />
                    </div>
                    <div
                        style={{
                            border: "2px solid #000",
                            background: "transparent",
                            borderRadius: "12px",
                            padding: "40px 20px 20px 20px",
                            color: "white",
                            boxShadow: "0 0 5px 3px rgba(119, 53, 136, 0.459)",
                            opacity: "0.9",
                            transition: "all 0.5s ease",
                            height: "100%",
                        }}
                        className="project-card-view2"
                    >
                        <div style={{ fontSize: "1.5em", marginBottom: "10px" }}>
                            Kaggle Notebooks :
                        </div>
                        <Row style={{ justifyContent: "center", fontSize: "4em" }}>
                            {kaggle}
                        </Row>
                    </div>
                </div>
            </Col>

        </Row>
    )
}

export default WhatIDid