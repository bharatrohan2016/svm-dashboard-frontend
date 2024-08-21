import { useEffect, useState } from "react";
import Filter from "./Filter";
import { getFarmerById, getFileIdFromDriveLink, getOtherFarmersById } from "../../Service/api";
import { useParams } from "react-router-dom";

const OtherFarmerProfile = () => {
    const {id} = useParams();
    const [data, setData] = useState(undefined);
    const [surveys, setSurveys] = useState([]);
    const [message, setMessage] = useState("");
    const changeHandler = (event) => {
        const year = event.target.value;
        const {surveydate1, surveydate2} = data;

        let surveys_ = [];
        
        if(surveydate1 && surveydate1.includes(year)){
            surveys_.push({ surveydate :  surveydate1, maplink : data.map1link })
        }

        if(surveydate2 && surveydate2.includes(year)){
            surveys_.push({ surveydate : surveydate2, maplink : data.map2link })
        }

        if(surveys_.length === 0){
            setMessage("No Survey happened in this year.")
        }else{
            setMessage("");
            setSurveys(surveys_);
        }
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
                <h5 className="text-primary">Personal Details  </h5>
                
                <p>Father's name : {data.fatherName && data.fatherName!="-" ? <span>{data.fatherName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Mobile : {data.phoneNumber!="-" ? <span>{data.phoneNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Gender :  {data.gender!="-" ? <span>{data.gender}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Date Of Birth :  {data.dateOfBirth!="-" ? <span>{data.dateOfBirth.split('T')[0]}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Aadhaar/PAN/ID :  {data.aadhaarNumber ? <span>{data.aadhaarNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            
            <div className="card mt-3">
               <h5 className="text-primary">Location Details </h5>
               <p>Village  : {data.village && data.village!="-" ? <span>{data.village}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
               <p>Block : {data.block && data.block!="-" ? <span>{data.block}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>District :  {data.district && data.district!="-" ? <span>{data.district}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>State : {data.state && data.state!="-" ? <span>{data.state}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>

            <div className="card mt-3">
               <h5 className="text-primary">Crop Details </h5>
               {
                data.crops.map((crop) => <div>
                    <p>Crop  : {crop.cropName ? <span>{crop.cropName}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                    <p>Acreage : {data.area  ? <span>{data.area} Acres</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Variety :  {crop.variety ? <span>{crop.variety}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Season : {crop.season ? <span>{crop.season}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Year : {crop.year ? <span>{crop.year}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Yeild Per Acre : {crop.yieldPerAcre ? <span>{crop.yieldPerAcre}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                </div>
                )
               }
            </div>
            {/* <div  className="card mt-3">
                <h5 className="text-primary">Billing Address </h5>
                <p>Billing Street : {data.billingStreet && data.billingStreet!="" ?  <span>{data.billingStreet}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing Zip Code : {data.billingZipCode&& data.billingStreet!="-"  &&data.billingZipCode!="" ?  <span>{data.billingZipCode}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing City : {data.billingCity && data.billingCity!="-" ?  <span>{data.billingCity}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing State : {data.billingState && data.billingState!="-" ?  <span>{data.billingState}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing Country : {data.billingCountry &&data.billingCountry!="-" ?  <span>{data.billingCountry}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div> */}
            {/* <div  className="card mt-3">
                <h5 className="text-primary">Advisory Information </h5>
                
                <div className="row mt-3">
                <h5>Survey Details :</h5>
                    <div className="col-md-6">
                        <select className="form-select" onChange={changeHandler} style={{outline : 'none', borderRadius : 0, boxShadow : 'none'}}>
                            <option>Select year</option>
                            <option value='2023'>2023</option>
                            <option value='2022'>2022</option>
                            <option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <select className="form-select" defaultValue='kharif' style={{outline : 'none', borderRadius : 0, boxShadow : 'none'}}>
                            <option disabled={true}>Select season</option>
                            <option value='kharif'>Kharif</option>
                            <option value='rabi'>Rabi</option>
                            <option value='zaid'>Zaid</option>
                        </select>
                    </div>
                
                </div>
               <div className="row m-1 mt-3">
                    
                    {
                        message==="" ?
                            surveys.map((survey, index) => 
                                <div>
                                        <p><u>Survey Date </u>: {survey.surveydate}</p>
                                        <iframe style={{width : '100%'}} src={`https://drive.google.com/file/d/${getFileIdFromDriveLink(survey.maplink)}/preview`} width="640" height="480" allow="autoplay"></iframe>

                                        {
                                            index === surveys.length-1 ? 
                                            <>
                                            <h5 className="mt-3"><span className="badge bg-warning">Agronomic Advisory</span></h5>
                                            <p>Hi BharatRohan farmer 👋, based on our recent drone survey done on August 18-20, we have identified that your farm has been diagnosed with Rhizome rot and wilt. Please use Silver Shakti with a dosage of 400g by spraying method for treating your farm.
                                            Hope we were able to help you out! 🙂🙂 
                                           <br/>
                                            <span style={{fontSize : '16px', fontWeight : 'bolder'}}>- BharatRohan Airborne Innovations</span></p></> : ''
                                        }
                                </div>
                            )
                         : message
                    }


               </div>
            </div> */}
           
        </div> : 'Select a farmer name whose profile you want to view.'
        }
       </>
    );
}

export default OtherFarmerProfile;