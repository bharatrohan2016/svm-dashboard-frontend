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
       <Filter value={changeHandler} />
        {
            data!=undefined ? 
            <div>
            <hr/>
            <div className="card mt-2">
                <p style={{fontSize : '18px', padding : 0, margin: 0}}><b>{data.name}</b></p>
            </div>
            <div className="card mt-2">
                <h4>Personal Details  </h4>
                <p>Father's name : {data.fathersName!="-" ? <span>{data.fathersName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Family Members : {data.familyMembers!="-" ? <span>{data.familyMembers}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                <p>Children : {data.children!="-" ? <span>{data.children}</span> : <span className="badge bg-danger">Not Entered</span>} </p>
                <p>Mobile : {data.phone!="-" ? <span>{data.phone}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            <div className="card mt-3">
                    <h4>Account Information  </h4>
                    <p>Bank Name : {data.bankName!="-" ? <span>{data.bankName}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>Account Number : {data.accountNumber!="-" ? <span>{data.accountNumber}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
                    <p>IFSC : {data.ifsc!="-" ? <span>{data.ifsc}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            <div className="card mt-3">
               <h4>Address </h4>

               <p>Tehsil :  {data.tehsil!="-" ? <span>{data.tehsil}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Village : {data.village!="" ?  <span>{data.village}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Block :  {data.block!="-" ? <span>{data.block}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            <div className="card mt-3">
               <h4>Other Information </h4>
               <p>Shipping City :  {data.shippingCity!="-" ? <span>{data.shippingCity}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Shipping Country :  {data.shippingCountry!="-" ? <span>{data.shippingCountry}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Billing Street : {data.billingStreet!="" ?  <span>{data.billingStreet}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
               <p>Major Buyer :  {data.majorBuyer!="-" ? <span>{data.majorBuyer}</span> : <span className="badge bg-danger">Not Entered</span>}</p>
            </div>
            
        </div> : 'Select a farmer name whose profile you want to view.'
        }
       </>
    );
}

export default FarmerProfile;