import axios from 'axios';
const URL = 'https://svmbackend.bharatrohan.in';
// const URL = "http://localhost:3200"

export function getHeaders(){
    const token = localStorage.getItem('token');
    // console.log(token)
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    return headers;
}

export const signInUser = async(data) => {
    try {
        console.log('Api hitted');
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/signin-user`, data, config)
        console.log(result);
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}

export const exportCSV = async (formData) =>{
    try{
        const result = await axios.post(`${URL}/api/farmer-csv`, formData);
        return result.data;
    }catch(e){
        console.log(e)
    }
}

export const getFarmers = async () => {
    try{
        const result = await axios.get(`${URL}/api/farmer`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e)
    }
}

export const getFarmersByQuery  = async (query) => {
    try{
        console.log(query)
        const result = await axios.post(`${URL}/api/filter-farmers`, query);
        return result.data;
    }catch(e){
        console.log(e);
    }
}

export const getMapsInfo = async () => {
    try {
        const result = await axios.get(`${URL}/api/farmer-maps-data`)
        return result;
    } catch (error) {
        console.log(error);
    }
}


export const getDashboardInfo = async() => {
    try {
        const result = await axios.get(`${URL}/api/dashboard/totalitems`);
        console.log(result);
        return result;
    } catch (error) {
        console.log("hit");
        console.log(error);
    }
}
export const getFarmerById = async(id) => {
    const result = await axios.get(`${URL}/api/farmer/${id}`);
    return result.data;
}

export const getFileIdFromDriveLink = (driveLink) => {
    const regex = /[-\w]{25,}/;
    const match = driveLink.match(regex);
    return match ? match[0] : null;
  }

export const getOtherFarmers = async () => {
    try{
        const result = await axios.get(`${URL}/api/farmer-2024`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e)
    }
}

export const getOtherFarmersByQuery  = async (query) => {
    try{
        console.log(query)
        const result = await axios.post(`${URL}/api/filter-farmer-2024`, query, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}

export const getOtherFarmersById  = async (id) => {
    console.log(id)
    try{
        const result = await axios.get(`${URL}/api/get-single-farmer-2024/${id}`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}

export const getOtherTotalFarmers  = async () => {
    try{
        const result = await axios.get(`${URL}/api/totalitems-2024`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}


export const getPolygons = async () => {
    try{
        const result = await axios.get(`${URL}/api/polygons`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}


export const getVillageWiseArea = async () => {
    try{
        const result = await axios.get(`${URL}/api/village-wise-area`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}

export const getVillageWiseFarmerCount = async () => {
    try{
        const result = await axios.get(`${URL}/api/village-wise-farmer-number`, {headers : getHeaders()});
        return result.data;
    }catch(e){
        console.log(e);
    }
}