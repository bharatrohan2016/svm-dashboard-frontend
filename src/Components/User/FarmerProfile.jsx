import { useEffect, useState } from "react";
import Filter from "./Filter";
import { getFarmerById } from "../../Service/api";

const FarmerProfile = () => {
    const [data, setData] = useState(undefined);

    //recives id from Filter.jsx
    const changeHandler = (id) => {
        getFarmerById(id).then((response) => {
            console.log(response);
            setData(response.data);
        })
    }
     return (
       <>
       <h3 style={{textAlign : 'left', color : '#242b4d'}}>Farmers Profile</h3>
       <Filter value={changeHandler} />
        {
            data!=undefined ? 
            <div>
            <hr/>
            <div className="card mt-4">
                <p style={{fontSize : '28px', padding : 0, margin: 0, color : "#242b4d"}}><b>{data.name}</b></p>
            </div>
            
            <div className="card mt-3">
                <h5 className="text-primary">Personal Details  </h5>
                <p>Father's name : {data.fathersName && data.fathersName!="-" ? <span>{data.fathersName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Family Members : {data.familyMembers!="-" ? <span>{data.familyMembers}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Children : {data.children!="-" ? <span>{data.children}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                <p>Mobile : {data.phone!="-" ? <span>{data.phone}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Tehsil :  {data.tehsil!="-" ? <span>{data.tehsil}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Major Buyer :  {data.majorBuyer!="-" ? <span>{data.majorBuyer}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Village : {data.village!="" ?  <span>{data.village}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Block :  {data.block!="-" ? <span>{data.block}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Aadhaar Number :  {data.aadhaarNumber && data.aadhaarNumber!="-" ? <span>{data.aadhaarNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>

            </div>
            <div className="card mt-3">
                    <h5 className="text-primary">Account Information  </h5>
                    <p>Bank Name : {data.bankName!="-" ? <span>{data.bankName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Account Number : {data.accountNumber!="-" ? <span>{data.accountNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>IFSC : {data.ifsc!="-" ? <span>{data.ifsc}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            <div className="card mt-3">
               <h5 className="text-primary">Shipping Address </h5>
               <p>Shipping Street : {data.shippingStreet && data.shippingStreet!="-" ? <span>{data.shippingStreet}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
               <p>Shipping Zip/Postal code : {data.shippingZipCode && data.shippingZipCode!="-" ? <span>{data.shippingZipCode}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Shipping City :  {data.shippingCity && data.shippingCity!="-" ? <span>{data.shippingCity}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Shipping State : {data.shippingState && data.shippingState!="-" ? <span>{data.shippingState}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Shipping Country :  {data.shippingCountry && data.shippingCountry!="-" ? <span>{data.shippingCountry}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            <div  className="card mt-3">
                <h5 className="text-primary">Billing Address </h5>

                <p>Billing Street : {data.billingStreet && data.billingStreet!="" ?  <span>{data.billingStreet}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing Zip Code : {data.billingZipCode &&data.billingZipCode!="" ?  <span>{data.billingZipCode}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing City : {data.billingCity && data.billingCity!="" ?  <span>{data.billingCity}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing State : {data.billingState && data.billingState!="" ?  <span>{data.billingState}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Billing Country : {data.billingCountry &&data.billingCountry!="" ?  <span>{data.billingCountry}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                
            </div>
           
        </div> : 'Select a farmer name whose profile you want to view.'
        }
       </>
    );
}

export default FarmerProfile;