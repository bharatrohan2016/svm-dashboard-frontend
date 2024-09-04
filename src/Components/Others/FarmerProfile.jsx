import { useEffect, useState } from "react";
import Filter from "./Filter";
import { getFarmerById, getFileIdFromDriveLink, getOtherFarmersById } from "../../Service/api";
import { useParams } from "react-router-dom";

const OtherFarmerProfile = () => {
    const {id} = useParams();
    const [data, setData] = useState(undefined);
    const [surveys, setSurveys] = useState([]);
   
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
                <h5 className="text-primary">Personal & Location Details  </h5>
                <p>Farmer ID : {data.excel_id}</p>
                {/* <p>Father's name : {data.fatherName && data.fatherName!="-" ? <span>{data.fatherName}</span> : <span className="badge bg-danger">Not Entered</span>}</p> */}
                <p>Mobile : {data.phoneNumber!="-" ? <span>{data.phoneNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Gender :  {data.gender!="-" ? <span>{data.gender}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Pincode : {data.pincode!="" ? <span>{data.postalCode}</span> : <span className="badge bg-danger">Not Entered</span> }</p>
                {/* <p>Date Of Birth :  {data.dateOfBirth ? <span>{data.dateOfBirth.split('T')[0]}</span> : <span className="badge bg-danger">Not Entered</span>}</p> */}
                {/* <p>Aadhaar/PAN/ID :  {data.aadhaarNumber ? <span>{data.aadhaarNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p> */}
                <p>Village  : {data.village && data.village!="-" ? <span>{data.village}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
               <p>Block : {data.block && data.block!="-" ? <span>{data.block}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>District :  {data.district && data.district!="-" ? <span>{data.district}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>State : {data.state && data.state!="-" ? <span>{data.state}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            
            <div className="card mt-3">
               <h5 className="text-primary">Crop Details </h5>
               {
                data.crops.length === 0 && <span className="text-danger">No Crops to display.</span>
               }
               {
                data.crops.map((crop) => <div>
                    <p>Crop  : {crop.cropName ? <span>{crop.cropName}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                    <p>Acreage : {data.area  ? <span>{data.area} Acres</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Variety :  {crop.variety ? <span>{crop.variety}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Season : {crop.season ? <span>{crop.season}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Year : 2024</p>
                    <p>Major Buyer : {crop.majorbuyer ? <span>{crop.majorbuyer}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                    
                </div>
                )
               }
            </div>
           
            <div  className="card mt-3">
                <h5 className="text-primary">Advisory Information </h5>
               <div className="row m-1 mt-3">
                    {
                        data.survey.length === 0 && <span className="text-danger">No Surveys to display.</span>
                    }
                    {
                        data.survey.map((item) => 
                        <div>
                            <p><u>Survey Date</u> : 17-07-2024</p>
                            <p><u>Crop</u> : {item.cropName}</p>
                            <p><u>Survey Photo</u> : </p>
                            <iframe style={{width : '100%'}} src={`https://drive.google.com/file/d/${getFileIdFromDriveLink(item.map_link)}/preview`} width="640" height="480" allow="autoplay"></iframe>
                            <h5 className="mt-3"><span className="badge bg-warning">Agronomic Advisory</span></h5>
                            {/* <p>Advisory :</p> */}
                            <p>Hi BharatRohan farmer 👋👋, {item.treatment}.<br/>
                            Hope we were able to help you out!🙂 
                            <br/>
                            <span style={{fontSize : '16px', fontWeight : 'bolder'}}>- BharatRohan Airborne Innovations</span></p>
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