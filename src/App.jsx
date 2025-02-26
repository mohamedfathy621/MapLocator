import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import axios from "axios";
import "./animation.css"
import { useState,useEffect } from 'react';
import { Button, Typography,Container,TextField, } from '@mui/material';
function App() {
  const perland="29.54312708961207,-95.38899115941311"
  const huston="29.558626292694672,-95.11641800358714"
  const zaragoza="31.75139767516325,-106.2800946035236"
  const Allen="33.11183374478102,-96.67957493231651"
  const [perland_route,setPerRoute] = useState([])
  const [houston_route,setHouRoute] = useState([])
  const [zaragoza_route,setZarRoute] = useState([])
  const [allen_route,setAllRoute] = useState([])
  const [shortest,setShortest] = useState()
  const sites=[[perland,setPerRoute],[huston,setHouRoute],[zaragoza,setZarRoute],[Allen,setAllRoute]]
  const routes=[[perland_route,"Perland"],[houston_route,"Houston"],[zaragoza_route,"Zaragoza"],[allen_route,"Allen"]]
  const [loading,setLoading] = useState(false)
  const [geocode,setGeocode] = useState()
  const [address,setAddress] = useState()
  const [waiting,setWaiting] = useState(false)
  const [mistake,setMistake] = useState()
  const [choices,setChoices] = useState()
  const key=import.meta.env.VITE_MAP_API_KEY;
  const get_Geocode = async(destination)=>{
    setWaiting(true)
    setMistake()
    setChoices()
    await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${destination.replace("#","")}&apiKey=${key}`).then((ans)=>{
      let result=ans.data.items
      if(result.length>1){
        setWaiting(false)
        console.log(result)
        setChoices(result)
        console.log("this address matches more than one address")
        setMistake("this address matches more than one address, choose the correct one")
      }
      else{
        console.log(result[0])
        
        setGeocode([result[0].position['lat'],result[0].position['lng']])
      }
    }).catch((e)=>setMistake(e.response.data.error))
  }
  const get_route= async(origin,route_wrapper)=>{
    await axios.get(`https://router.hereapi.com/v8/routes?apiKey=${key}&transportMode=car&origin=${origin}&destination=${geocode[0]},${geocode[1]}&return=summary`)
    .then(
    (ans)=>{route_wrapper(ans.data.routes[0].sections)}
    )
  }
  const load_routes= async()=>{
    const loading_routes=sites.map((site)=>get_route(site[0],site[1]))
    Promise.all(loading_routes).then(()=>{
      setLoading(true)
      setWaiting(false)
    }).catch((e)=>setMistake(e.response.data.error))
  }
  useEffect( ()=>{
    if(geocode){
        load_routes()
    }
  },[geocode])
  useEffect( ()=>{
    if(routes&&loading){
      let min=routes[0][0][0].summary.length
      let index=0
      for(let i=1;i<4;i++){
        if(routes[i][0][0].summary.length<min){
          min=routes[i][0][0].summary.length
          index=i
        }
      }
      setShortest(index)
    }
    console.log(loading)
  },[loading])
  
  const meter_to_miles=(x)=>{
    return 0.00062137*x
  }
  const seconds_to_hours_and_minutes=(x)=>{
    return `${parseInt(x/3600)} Hours and ${parseInt((x%3600)/60)} Minutes`
  }
  console.log(choices)
  return (
    <>
   
    <Box sx={{height:"70vh",width:'70%',bgcolor:"white",margin:"auto",mt:15,borderRadius:"20px",border:'1px solid #E7E7E7',boxShadow:"10",px:2}}>
     
      <Box sx={{mt:4,textAlign:"center"}}>
      <Typography variant='body1' sx={{fontFamily:"Poppins",mt:7,fontSize:"2rem"}}>Find the shortest path</Typography>
      <div style={{margin:"auto",display:"block",width:"50%"}}>
      <TextField label={'address'} value={address} onChange={(e)=>setAddress(e.target.value)} variant='outlined'  name={'address'} fullWidth sx={{"& .MuiOutlinedInput-root": {height: "58.13px",width:"100%"}}}/>
      <Button variant='contained' sx={{display:"block",margin:"auto",mt:2}} onClick={()=>get_Geocode(address)}>Route</Button>
      </div>
      </Box>
      <Box sx={{border:"1px solid  #E7E7E7",mt:5,maxHeight:"30vh",overflowY:"scroll",py:1,display:choices&&!waiting?"":"none"}}>
        {choices?choices.map((choice,index)=>
        <Typography onClick={()=>{
        get_Geocode(choice.title)
        setAddress(choice.title)}} 
        variant='body1' sx={{cursor:"pointer",fontFamily:"Poppins",fontSize:"20px",ml:'2%',mb:"5px",":hover":{color:"blue"}}}>{(index+1)+"-"+choice.title}</Typography>):""}
      </Box>
      
      <Grid container spacing={2} sx={{width:'100%',height:"15vh",mt:5,display:loading&&!waiting?"":"none"}}>
        {loading?
          routes.map((route,index)=>
            <Grid key={route[1]+"_route"} size={3} sx={{textAlign:"center",border:"1px solid #E7E7E7"}}>
            <Typography variant='body1' sx={{fontFamily:"Poppins",fontSize:"20px",mb:2}}>Lotus {route[1]}</Typography>
            <Typography variant='body1' sx={{fontFamily:"Poppins",fontSize:"15px",mb:2}}>Distance: {meter_to_miles(route[0][0].summary.length).toFixed(3)} miles</Typography>
            <Typography variant='body1' sx={{fontFamily:"Poppins",fontSize:"15px",mb:2}}>Time: {seconds_to_hours_and_minutes(route[0][0].summary.duration)}</Typography>
            <Typography variant='body1' sx={{fontFamily:"Poppins",fontSize:"15px",mb:2}}> Notes:</Typography> 
            { route[0][0].notices?
                route[0][0].notices.map((notice,index)=>
                  <Typography key={"perland_"+index} variant='body1' sx={{fontFamily:"Poppins",fontSize:"15px"}}>{notice.title}</Typography>
                )
              : 
                "No notes for this route"
              }
              <Typography variant='body1' sx={{fontFamily:"Poppins",fontSize:"25px",mt:2,display:shortest==index?"":"none",color:"green"}}>This is the shortest route</Typography>
            </Grid>
          )
        :""
        }
         
      </Grid>
      <Box className='loading_screen' sx={{position:"relative",width:"30%",display:waiting?"":"none",height:"20vh",margin:"auto",mt:"5%",border:"1px solid #E7E7E7",boxShadow:"10",textAlign:"center",alignContent:"center"}}>
      <Typography  variant='body1' sx={{fontFamily:"Poppins",fontSize:"40px",mt:2,color:"green"}}>Loading...</Typography>
      </Box>
      <Typography  variant='body1' sx={{fontFamily:"Poppins",fontSize:"20px",ml:'30%',color:"red",display:mistake?"":"none"}}>{mistake?mistake:""}</Typography>
    </Box>
    

    </>
  )
}

export default App
