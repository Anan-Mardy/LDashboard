import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import './Landing.css'
import spaceXLogo from "../help/spacex.svg";
import Comp from './Comp';



const Landing = () => {  
  

  return (
    <>
        <div id="landingPage">
        <div id="title">
            <img src={spaceXLogo} id="landingLogo" alt="SpaceX Logo" style={{display:"flex", margin:"auto",width:"50%"}} />
        </div>
        <div style={{display:"flex", justifyContent:"Center",flexDirection:'column',alignItem:"center",marginTop:"20px"}}>
            <h1 id="landingSubheading" style={{color:"white", margin:"auto"}}>Launch Dashboard</h1>
            <Link to="/launch" style={{margin:"auto"}}>
            <ArrowCircleRightOutlinedIcon fontSize="large" className="fwd"/>
            </Link>
        </div>
        <Comp/>
      </div>


    </>
  );
};

export default Landing;