import React from "react";
import { TbChessKnight } from "react-icons/tb";
import { TbMusic } from "react-icons/tb";
import { TbBallFootball } from "react-icons/tb";

function AboutCard({ quote, quoteOwner }) {
  return (
    <div className="quote-card-view">
      <blockquote className="blockquote mb-0">
        <p style={{ textAlign: "justify" }}>
          Hi There, I am <span className="purple">Necip Arda Kocabaş </span>
          from <span className="purple"> Istanbul, Turkey.</span>
          <br /><br />
          I am currently working for <a href="https://miletakademi.net/" className="purple" target="_blank" rel="noreferrer"> Milet Akademi</a>.
          <br />
          I am a first year computer engineering student at<span className="purple">  Yıldız Technical University.</span>
          <br />
          I completed a 4-year education at <a href="https://www.deneyap.org/tr/" className="purple" target="_blank" rel="noreferrer">  Deneyap Turkey Workshops</a> focusing on <a href="https://www.deneyap.org/en/education/topics/" className="purple" target="_blank" rel="noreferrer">various engineering fields.</a>
          <br /><br />
          Apart from coding, some other activities that I love to do!
        </p>
        <ul>
          <li className="about-activity">
            <TbChessKnight /> Playing Chess
          </li>
          <li className="about-activity">
            <TbMusic /> Producing Music
          </li>
          <li className="about-activity">
            <TbBallFootball /> Playing Football
          </li>
        </ul>

        <p style={{ color: "rgb(155 126 172)" }}>
          {'" '+quote+' " '}
        </p>
        <footer className="blockquote-footer">{quoteOwner}</footer>
      </blockquote>

    </div>
  );
}

export default AboutCard;
