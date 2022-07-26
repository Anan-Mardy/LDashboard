import React,{useEffect,useState} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './launch.css';
import { DataGrid } from '@mui/x-data-grid';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import LoadingContainer from '../loadingAnimation/Animation';
// import LoadingContainer from '../loadingAnimation/Animation';
// import { SolarSystemLoading } from "react-loadingg";
import ScaleLoader from "react-spinners/ScaleLoader";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DownloadIcon from '@mui/icons-material/Download';

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
    //   cellClassName: (params) =>
    //     clsx("super-app", {
    //       Success: params.value === "Success",
    //       Failure: params.value === "Failed",
    //       Upcoming: params.value === "Upcoming",
    //     }),
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
    // const [Data1,setData1]=useState([]);
    // const[Data2,setData2]=useState([]);

    useEffect(()=>{
        getData();
    },[])

    const getData=async()=>{
        const res= await axios.get(`https://api.spacexdata.com/v4/launches`) ;
        // const res1=await axios.get(`https://api.spacexdata.com/v4/launchpads`);
        // const res2=await axios.get(`https://api.spacexdata.com/v4/rockets`);
        
        setData(res.data);
        
       
        // console.log(res.data);

    }

    //////////////////////////////////////////
    const rows = Data.map((item, index) => {
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
      });

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

      const clickHandler = async (id) => {
        setOpen(true);
        let response=Data[id-1];
          console.log(response);
          set_loading(false);
          setflightData(response);
      };

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
        <div className='container-fluid mt-3'>
        <div className='main-heading'>
         <h1 className='text-center'>SpaceX</h1>
        </div>
            <div>
                <DataGrid
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    autoHeight
                    autoWidth
                    rows={rows}
                    columns={columns}
                    pageSize={9}
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
                        <a href={flightData.links.webcast} target="_kahibhi"> <YouTubeIcon fontSize='large' className='ytubee'/></a>
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