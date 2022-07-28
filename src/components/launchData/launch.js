import React,{useEffect,useState} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './launch.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";


import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import spaceXLogo from "../help/spacex.svg";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import ScaleLoader from "react-spinners/ScaleLoader";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DownloadIcon from '@mui/icons-material/Download';

//dateRange
//npm install react-date-range && npm install date-fns;
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



const columns = [
    {
      field: "id",
      headerName: "No:",
      width: 109,
      sortable: false,
      headerClassName: "customColumn",
      headerAlign: "left",
    },
    {
      field: "launched",
      headerName: "Date(UTC)",
      width: 180,
      sortable: false,
      headerClassName: "customColumn",
      headerAlign: "left",
    },
    {
      field: "location",
      headerName: "Location",
      width: 320,
      sortable: false,
      headerClassName: "customColumn",
      headerAlign: "left",
    },
    {
      field: "mission",
      headerName: "Mission",
      width: 250,
      sortable: false,
      headerClassName: "customColumn",
      headerAlign: "left",
    },
    {
      field: "launchstatus",
      headerName: "Launch Status",
      width: 200,
      sortable: false,
      headerClassName: "customColumn launch-status",
      headerAlign: "left",
    },
    {
      field: "rocket",
      headerName: "Rocket",
      width: 130,
      sortable: false,
      headerClassName: "customColumn",
      headerAlign: "left",
    },
  ];

const Launch=()=>{

    const [Data,setData]=useState([]);
    
    const [slt,setSlt]=useState("0");  //filter

    const [range,setRange]=useState([
      {
          startDate: new Date('2006-03-01T03:24:00'),
          endDate: new Date(),
          key:'selection'
      }
  ]); 


    useEffect(()=>{
        getData();
    },[])

    const getData=async()=>{
        const res= await axios.get(`https://api.spacexdata.com/v4/launches`) ;        
        setData(res.data);
    }

    const [Data0,setData0]=useState(Data);
    const Data1=Data.filter(checkup);
    const Data2= Data.filter(checksus);
    const Data3= Data.filter(checkfail);

    function checkdate(item){
      // return true;
      var d1 = Date.parse(item.date_utc.slice(0,10));
      var d2 = Date.parse(format(range[0].endDate,"yyyy-MM-dd"));
      var d3 = Date.parse(format(range[0].startDate,"yyyy-MM-dd"));
      
      return d1<d2 && d1>d3;
    }
    function checksus(item){
        return item.success;
    }
    function checkfail(item){
        return !item.success && !item.upcoming;
    }
    function checkup(item){
        return item.upcoming;
    }

    //The commented rows are initially when filter was not available

    // const rows = Data.map((item, index) => {
    //     let data = {
    //       id: index + 1,
    //       launched: item.date_utc.slice(0,10),
    //       location: (
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
    //         ?"VAFB SLC 3W, California":
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
    //         ?"CCSFS SLC 40, Florida":
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
    //         ?"STLS, Texas":
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
    //         ?"Kwajalein Atoll, Marshall Islands":
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
    //         ?"VAFB SLC 4E, California":
    //         item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
    //         ?"KSC LC 39A, Florida":"No-Data"
    //     ),
    //       mission: item.name,
    //       orbit: item.name,
    //       launchstatus: item.upcoming
    //         ? "Upcoming"
    //         : item.success
    //         ? "Success"
    //         : "Failed",
    //       rocket: (
    //         item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
    //         ?"Falcon 1":
    //         item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
    //         ?"Falcon 9":
    //         item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
    //         ?"Falcon Heavy":
    //         item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
    //         ?"Starship":"No-Data"
    //       ),
    //     };
    //     return data;
    //   });



      const rows = ((slt==="0")? Data.map((item, index) => {
        let data = {
          id: index + 1,
          launched: item.date_utc.slice(0,10),
          location: (
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
            ?"VAFB SLC 3W, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
            ?"CCSFS SLC 40, Florida":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
            ?"STLS, Texas":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
            ?"Kwajalein Atoll, Marshall Islands":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
            ?"VAFB SLC 4E, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
            ?"KSC LC 39A, Florida":"No-Data"
        ),
          mission: item.name,
          orbit: item.name,
          launchstatus: item.upcoming
            ? "Upcoming"
            : item.success
            ? "Success"
            : "Failed",
          rocket: (
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
            ?"Falcon 1":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
            ?"Falcon 9":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
            ?"Falcon Heavy":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
            ?"Starship":"No-Data"
          ),
        };
        return data;
      }):(slt==="4")? Data0.map((item, index) => {
        let data = {
          id: index + 1,
          launched: item.date_utc.slice(0,10),
          location: (
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
            ?"VAFB SLC 3W, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
            ?"CCSFS SLC 40, Florida":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
            ?"STLS, Texas":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
            ?"Kwajalein Atoll, Marshall Islands":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
            ?"VAFB SLC 4E, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
            ?"KSC LC 39A, Florida":"No-Data"
        ),
          mission: item.name,
          orbit: item.name,
          launchstatus: item.upcoming
            ? "Upcoming"
            : item.success
            ? "Success"
            : "Failed",
          rocket: (
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
            ?"Falcon 1":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
            ?"Falcon 9":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
            ?"Falcon Heavy":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
            ?"Starship":"No-Data"
          ),
        };
        return data;
      }):slt==="1"? Data1.map((item, index) => {
        let data = {
          id: index + 1,
          launched: item.date_utc.slice(0,10),
          location: (
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
            ?"VAFB SLC 3W, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
            ?"CCSFS SLC 40, Florida":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
            ?"STLS, Texas":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
            ?"Kwajalein Atoll, Marshall Islands":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
            ?"VAFB SLC 4E, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
            ?"KSC LC 39A, Florida":"No-Data"
        ),
          mission: item.name,
          orbit: item.name,
          launchstatus: item.upcoming
            ? "Upcoming"
            : item.success
            ? "Success"
            : "Failed",
          rocket: (
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
            ?"Falcon 1":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
            ?"Falcon 9":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
            ?"Falcon Heavy":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
            ?"Starship":"No-Data"
          ),
        };
        return data;
      }):slt==="2"? Data2.map((item, index) => {
        let data = {
          id: index + 1,
          launched: item.date_utc.slice(0,10),
          location: (
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
            ?"VAFB SLC 3W, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
            ?"CCSFS SLC 40, Florida":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
            ?"STLS, Texas":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
            ?"Kwajalein Atoll, Marshall Islands":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
            ?"VAFB SLC 4E, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
            ?"KSC LC 39A, Florida":"No-Data"
        ),
          mission: item.name,
          orbit: item.name,
          launchstatus: item.upcoming
            ? "Upcoming"
            : item.success
            ? "Success"
            : "Failed",
          rocket: (
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
            ?"Falcon 1":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
            ?"Falcon 9":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
            ?"Falcon Heavy":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
            ?"Starship":"No-Data"
          ),
        };
        return data;
      }):Data3.map((item, index) => {
        let data = {
          id: index + 1,
          launched: item.date_utc.slice(0,10),
          location: (
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='83'
            ?"VAFB SLC 3W, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='84'
            ?"CCSFS SLC 40, Florida":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='85'
            ?"STLS, Texas":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='86'
            ?"Kwajalein Atoll, Marshall Islands":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='87'
            ?"VAFB SLC 4E, California":
            item.launchpad.slice(item.launchpad.length-2,item.launchpad.length)==='88'
            ?"KSC LC 39A, Florida":"No-Data"
        ),
          mission: item.name,
          orbit: item.name,
          launchstatus: item.upcoming
            ? "Upcoming"
            : item.success
            ? "Success"
            : "Failed",
          rocket: (
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='b'
            ?"Falcon 1":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='c'
            ?"Falcon 9":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='d'
            ?"Falcon Heavy":
            item.rocket.slice(item.rocket.length-1,item.rocket.length)==='e'
            ?"Starship":"No-Data"
          ),
        };
        return data;
      })
      );

      const CustomLoader = () => {
        return (
          <div className="div-loading">
            < ScaleLoader/>
          </div>
        );
      };

      const [loading,set_loading]=useState(true);
      const [flightData,setflightData]=useState({});
      const [open,setOpen]=useState(false);
      const [copen,setCopen]=useState(false); //date Range


      const clickHandler = async (id) => {
        setOpen(true);
        let response=Data[id-1];
          console.log(response);
          set_loading(false);
          setflightData(response);
      };

      /////////////////////////// the below two function are used in date range.

      const clickHandler2= ()=>{
        setCopen(true);
        setData0(Data.filter(checkdate));
        
      }

      const innerbutton=()=>{
        setCopen(!copen);
        setData0(Data.filter(checkdate));
        // setflag("0");
        setSlt("4");
      }

      //////////////////////////////////

      const ColorChooser=({param})=>{
        return (
          <div className='status'>
            <span id={param}>
              {param}
            </span>
          </div>
        )
      }

    return (
        <>
        <div className='container-fluid mt-3 newbody'>
          <div className='main-heading'>         
          <img src={spaceXLogo} id="landingLogo" alt="SpaceX Logo" style={{ margin:"auto",width:"50%"}} />
          <Link to="/" style={{marginRight:"0"}}>
              <KeyboardReturnIcon fontSize="large" className="fwd"/>
            </Link>
          </div>

          <div className='addons'>

            <button onClick={()=>clickHandler2()} className='DateBox'>Filter By Date</button>      

            <select value={slt} onChange={(event)=>{
                  setSlt(event.target.value); }}  className="SelectBox">
                  <option value='0' className='options'>All</option>
                  <option value='1' className='options'>Upcoming</option>
                  <option value='2' className='options'>Success</option>
                  <option value='3' className='options'>Failure</option>
                  <option value='4' className='options' disabled='true'>Till-Date</option>

              </select>

          </div>

            <div className='container-ji'>
                <DataGrid
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    autoHeight
                    autoWidth
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    components={{
                      LoadingOverlay: CustomLoader,
                     }}
                    onRowClick={(GridRowData)=>clickHandler(GridRowData.id)}
                    loading={rows.length>0?false:true}
                    className="datagrid"
                />
            </div>

            <div>   
                <Modal
                  open={copen}
                  onClose={()=>
                  setCopen(!copen)} >
                  {(<Box sx={{...styles,width:400}}>

                    <DateRange 
                    date={new Date()}
                    onChange={item=>setRange([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction="horizontal"
                    // className="calendarElement"
                    />
                    <Button variant="contained" onClick={()=>{innerbutton()}} style={{display:"flex", margin:"auto"}} >Done</Button>

                  </Box>)}</Modal>
              </div> 

            <div>
                    <Modal
                      open={open}
                      onClose={()=>setOpen(!open)}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                    {loading?(<CustomLoader/>):(
                      <Box sx={{ ...styles, width: 400 }}>
                      <div className='top-section'>
                          <img 
                          className='top-section-image'
                          src={flightData?.links.patch.small}
                          alt=" ">                    
                          </img>
                          <div>
                            <h5>{flightData.name}</h5>
                            <p>{
                              (
                                flightData.rocket.slice(flightData.rocket.length-1,flightData.rocket.length)==='b'
                                ?"Falcon 1":
                                flightData.rocket.slice(flightData.rocket.length-1,flightData.rocket.length)==='c'
                                ?"Falcon 9":
                                flightData.rocket.slice(flightData.rocket.length-1,flightData.rocket.length)==='d'
                                ?"Falcon Heavy":
                                flightData.rocket.slice(flightData.rocket.length-1,flightData.rocket.length)==='e'
                                ?"Starship":"No-Data"
                              )
                            }</p>
                          </div>
                          {/* <p className='top-p'>{
                            flightData.upcoming?"Upcoming":
                            flightData.success?"Success":
                            "Failed"
                          }</p> */}

                          <p className='top-p'>
                            {
                              flightData.upcoming?(
                                <ColorChooser param="Upcoming"/>
                              ):flightData.success?(
                                <ColorChooser param="Success"/>
                              ):(
                                <ColorChooser param="Failed"/>
                              )
                            }</p>

                      </div>
                        <h2 id="parent-modal-title" style={{marginTop:"1rem"}}>Details</h2>

                        <div className='"detailDescription'>
                        <p className='desc-p'>
                          {flightData.details}{"."}
                          <a
                            href={flightData?.links?.wikipedia}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            Wikipedia
                          </a>
                        </p>
                        </div> 

                        <div className="lower-section">

                        <div className="flight-row">
                          <p className='left'>Launch Date</p> 

                          <p className='right'>{flightData.date_utc.slice(0,10)} </p>
                        </div>
                        <hr className="detail-separator" />
                        <div className="flight-row">
                          <p className='left'>Flight Number</p>
                          <p className='right'>{flightData.flight_number}</p>
                        </div>
                        
                        
                        <hr className="detail-separator" />
                        <div className="flight-row">
                          <p className='left'>Manufacturer</p>
                          <p className='right'>SpaceX</p>
                        </div>
                        
                        <hr className="detail-separator" />
                        
                        
                      </div>  
                      <Stack spacing={2} direction="row" style={{justifyContent:"center" ,marginTop:"2rem"}}>
                        <a href={flightData.links.article}><Button variant="contained" ><ReadMoreIcon/>More</Button></a>
                        <a href={flightData.links.presskit}><Button variant="contained" ><DownloadIcon/>About</Button></a>
                      </Stack>  
                      <Stack spacing={2} direction="row" style={{justifyContent:"center" ,marginTop:"10px"}}>
                      <a href={flightData.links.webcast} target="_kahibhi">
                              <YouTubeIcon fontSize='large' className='ytubee'/>
                      </a>
                      </Stack>                   
                      </Box>
                      )}
                    </Modal>
            </div>

        </div>
        </>
    )
}
export default Launch;