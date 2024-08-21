import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function getHeaders(){
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    return headers;
}

export function  getFormHeaders(){
    const token = localStorage.getItem('token');
    const headers =  { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data'};
    return headers;
}

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            console.log("hit")
            navigate('/select-year');
        }
    },[]);
    
    return children;
}

export default ProtectedRoute;