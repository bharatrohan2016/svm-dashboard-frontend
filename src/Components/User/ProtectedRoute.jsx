import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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