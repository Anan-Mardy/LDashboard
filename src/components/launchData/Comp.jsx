import React,{useState,useEffect} from "react";
import './Comp.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import Landing from "./Landing";


const [name,rocket,data,location]=["FalconSat","Falcon 1","2006-03-24","Kwajalein Atoll, Marshall Islands"];


const Comp=()=>{


    
    return (
        <>
        <div id="upMis" className="table-responsive" style={{padding:"1rem"}}>
            <div>
            <thead>

            <tr>
                <td style={{width:"70%"}}><h1 style={{marginLeft:"10px"}}>The First Launch</h1></td>
                <td style={{paddingRight:"20px"}}>
                    <div>
                            <a
                                href="https://www.youtube.com/watch?v=0a_00nJ_Y88"
                                target="_blank"
                                rel="noreferrer"
                                id="webcastLink">
                                <div id="watchLiveButton" style={{color:"red"}}>
                                <Button  variant="outlined" className="but" ><YouTubeIcon className="ytube"/>this</Button>
                                </div>
                            </a>
                            
                    </div>
                </td>
                <td>
                <div>
                    <a
                        href="https://www.youtube.com/spacex"
                        target="_blank"
                        rel="noreferrer"
                        id="webcastLink">
                        <div id="watchLiveButton" style={{color:"red"}}>
                        <Button  variant="outlined" className="but" ><YouTubeIcon className="ytube"/>LIve</Button>
                        </div>
                    </a>                    
                    </div>

                </td>
            </tr>   
            </thead>

            
            </div>

            <tbody>
            <tr>

            
            <div className="oneblock">
            <td>
                    <div >
                        <img
                            src="https://www.trbimg.com/img-5a7a877e/turbine/ct-spacex-falcon-heavy-rocket-launch-20180206"
                            id="missionImage"
                            alt="Falcon 9 launch"
                            id="imgcon"
                        />
                    </div>
            </td>
            <td>           
                
                <div id="mainStats" style={{marginTop:"2rem"}}>
                    <h4 className="statHeading">MISSION_NAME</h4>
                    <h5 className="statFigure">{name}</h5>
                    <h4 className="statHeading">LAUNCH_DATE</h4>
                    <h5 className="statFigure">{data} </h5>
                    <h4 className="statHeading">ROCKET</h4>
                    <h5 className="statFigure"> {rocket}</h5>
                    <h4 className="statHeading">LAUNCH_SITE</h4>
                    <h5 className="statFigure"> {location}</h5>
                </div>
            </td>
            </div>
            </tr>
            </tbody>
        </div>
        </>
    );
}
export default Comp;