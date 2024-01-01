const baseURL = "https://api.scripture.api.bible";
const dotenv = require('dotenv').config();
const APIKEY = process.env.API_KEY; 

const axios = require('axios')

const getBibles = async () => {
    try{
        const response = await axios.get(`${baseURL}/v1/bibles`, {
            headers: {'api-key': APIKEY}
        });
        console.log(response.data);
        return response.data;
    } catch (error){
        console.error("Error fetching data: " , error);
    }
}

getBibles();