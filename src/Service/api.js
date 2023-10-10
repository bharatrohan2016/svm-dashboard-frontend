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