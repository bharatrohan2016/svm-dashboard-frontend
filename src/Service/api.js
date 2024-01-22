import axios from 'axios';
// const URL = 'https://svm-dashboard.uw.r.appspot.com';
const URL = "http://localhost:3200"


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
        const result = await axios.get(`${URL}/api/farmer`);
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


export const getDBFirstRow = async() => {
    try {
        console.log(JSON.parse(localStorage.getItem('token')));
        const config = {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }
        console.log(config);
        const result = await axios.get(`${URL}/api/dashboard/totalitems`, config);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}
export const getFarmerById = async(id) => {
    const result = await axios.get(`${URL}/api/farmer/${id}`);
    return result.data;
}

export const getFileIdFromDriveLink = (link) => {
    const match = link.match(/\/file\/d\/([^/]+)/);
  
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // Link doesn't match the expected format
    }
  }

