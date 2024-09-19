import { useEffect, useState } from "react";
import Filter from "./Filter";
import { getFarmerById, getFileIdFromDriveLink, getOtherFarmersById } from "../../Service/api";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const OtherFarmerProfile = () => {
    const {id} = useParams();
    const [data, setData] = useState(undefined);
    const calculateAcerage = (cropName) => {
        let totalArea = 0;
        for(let map of data.maps){
            if(map.crop_name === cropName)
                totalArea += map.area;
        }
        return (totalArea/4046.8564224).toFixed(2);
    }
   
    useEffect(()=>{
        getOtherFarmersById(id).then((response) => {
            console.log(response)
            setData(response.data);
        })
    },[])
     return (
       <>
       <h3 style={{textAlign : 'left', color : '#193C34 '}}>Farmers Profile</h3>
        {
            data!=undefined ? 
            <div style={{textAlign : 'left'}}>
            <hr/>
            <div className="card mt-4">
                <p style={{fontSize : '28px', padding : 0, margin: 0, color : "#193C34 "}}><b>{data.farmerName}</b></p>
            </div>
            
            <div className="card mt-3">
                <h3 className="text-primary">Personal & Location Details  </h3>
                <p>Farmer ID : {data.excel_id}</p>
                <p>Father's name : {data.fatherName && data.fatherName!="-" ? <span>{data.fatherName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Mobile : {data.phoneNumber!="" ? <span>{data.phoneNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Gender :  {data.gender!="" ? <span>{data.gender}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Pincode : {data.postalCode!="" ? <span>{data.postalCode}</span> : <span className="badge bg-danger">Not Entered</span> }</p>
                {/* <p>Date Of Birth :  {data.dateOfBirth ? <span>{data.dateOfBirth.split('T')[0]}</span> : <span className="badge bg-danger">Not Entered</span>}</p> */}
                {/* <p>Aadhaar/PAN/ID :  {data.aadhaarNumber ? <span>{data.aadhaarNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p> */}
                <p>Village  : {data.village && data.village!="-" ? <span>{data.village}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                <p>Block : {data.block && data.block!="-" ? <span>{data.block}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>District :  {data.district && data.district!="-" ? <span>{data.district}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>State : {data.state && data.state!="-" ? <span>{data.state}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            
            <div className="card mt-3">
               <h3 className="text-primary">Crop Details </h3>
               {
                data.crops.length === 0 && <span className="text-danger">No Crops to display.</span>
               }
               {
                data.crops.map((crop) => <div>
                    <p>Crop  : {crop.cropName ? <span>{crop.cropName}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                    <p>Acreage :  <span>{calculateAcerage(crop.cropName)} Acres</span> </p>
                    <p>Variety :  {crop.variety ? <span>{crop.variety}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Season : {crop.season ? <span>{crop.season}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Year : 2024</p>
                    <p>Major Buyer : {crop.majorbuyer ? <span>{crop.majorbuyer}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                    
                </div>
                )
               }
            </div>
           
            <div  className="card mt-3">
                <h3 className="text-primary">Advisory Information </h3>
               <div className="row m-1 mt-3">
                    {
                        data.survey.length === 0 && <span className="text-danger">No Surveys to display.</span>
                    }
                    {
                        data.survey.map((item, index) => 
                        <div>
                            <p><h4 style={{fontWeight : 700}}>Survey - {item.survey_no}</h4></p>
                            <span><u>Survey Date</u> : {moment(item.survey_date).format("DD MMMM, YYYY")}</span> <br/>
                            <span><u>Crop</u> : {item.cropName}</span> <br/>
                            <span><u>Survey Photo</u> :</span> <br/>
                            <iframe style={{width : '100%'}} src={`https://drive.google.com/file/d/${getFileIdFromDriveLink(item.map_link)}/preview`} width="640" height="480" allow="autoplay"></iframe>
                            <p className="mt-3"><span style={{textDecoration : 'underline',fontSize : '14px', fontWeight : 'bolder'}}>Agronomic Advisory</span></p>
                            {/* <p>Advisory :</p> */}
                            <p>Hi BharatRohan farmer 👋👋, {item.treatment}.<br/>
                            Hope we were able to help you out!🙂 
                            <br/>
                            <span style={{fontSize : '16px', fontWeight : 'bolder'}}>- BharatRohan Airborne Innovations</span></p>
                            <hr/>
                        </div>
                        )
                    }
               </div>
            </div>
           
        </div> : 'Select a farmer name whose profile you want to view.'
        }
       </>
    );
}

export default OtherFarmerProfile;