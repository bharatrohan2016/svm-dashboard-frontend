import axios from 'axios'
const URL = 'http://localhost:3000'


export const signInUser = async(data) => {
    try {
        console.log('Api hitted');
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/signin-user`, data, config)
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

export const getMapsInfo = async () => {
    try {
        const result = await axios.get(`${URL}/api/farmer-maps-data`)
        return result;
    } catch (error) {
        console.log(error);
    }
}