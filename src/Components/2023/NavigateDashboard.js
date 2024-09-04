import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigateDashboard = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log("hit")
            navigate('/select-year');
        }
    },[]);
    
    return children;
}

export default NavigateDashboard;