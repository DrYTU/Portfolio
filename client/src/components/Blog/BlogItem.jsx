import React from 'react'
import "./style.css"
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md"


function BlogItem(props) {

    const divStyle = { width: props.width || "auto" }
    

    return (props.size === "medium") || !props.size ? (
        <a href={'/blog/' + props._id} className={"card text-start " + props.class} style={divStyle} draggable="false">
            <div className="card-image">
                <img draggable="false" src={props.img} alt="overlay" />
            </div>
            <div className="card-content">
                <h2>{props.title}</h2>
                <p>{props.summary.slice(0, 150)}</p>
            </div>
            <div className='card-footer px-4 d-flex justify-content-between mt-auto'>
                <div>
                    <FaRegHeart color='#c40000' className='me-1' /><span>{props.favNum}</span>
                </div>
                <div>
                    <MdOutlineDateRange color='#00c400'
                        className='me-1'></MdOutlineDateRange>
                    <span>{props.date}</span>
                </div>
            </div>
        </a>
    ) : props.size === "small" ? (
        <a href={'/blog/' + props.id} className={props.classes ? "card small-card text-start " + props.classes : "card small-card text-start"} style={props.width ? { width: props.width } : null} draggable="false">
            <div className="small-card-image">
                <img draggable="false" src={props.img} alt="overlay" />
            </div>
            <div className="small-card-content">
                <h2>{props.title}</h2>
            </div>
            <div className='card-footer small-card-footer px-4 d-flex justify-content-between mt-auto'>
                <div>
                    <FaRegHeart color='#c40000' className='me-1' /><span>{props.favNum || 0}</span>
                </div>
                <div>
                    <MdOutlineDateRange color='#00c400' className='me-1'></MdOutlineDateRange>
                    <span >{props.date}</span>
                </div>
            </div>
        </a>
    ) : props.size === "search" ? (
        <a href={'/blog/' + props.id} className="card my-5 mx-md-4 mx-3 text-start" style={props.width ? { width: props.width } : null} draggable="false">
            <div className="card-image">
                <img draggable="false" src={props.img} alt="overlay" />
            </div>
            <div className="card-content">
                <h2>{props.title}</h2>
                <p>{props.summary.slice(0, 150)}</p>
            </div>
            <div className='card-footer px-4 d-flex justify-content-between'>
                <div>
                    <FaRegHeart color='#c40000' className='me-1' /><span>{props.favNum}</span>
                </div>
                <div>
                    <MdOutlineDateRange color='#00c400'
                        className='me-1'></MdOutlineDateRange>
                    <span>{props.date}</span>
                </div>
            </div>
        </a>
    ) : null
}

export default BlogItem