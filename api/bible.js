const baseURL = "https://api.scripture.api.bible";
const dotenv = require('dotenv').config();
const APIKEY = process.env.API_KEY;

const axios = require('axios')
const headers = {
    headers: { 'api-key': APIKEY }
}
const getBibles = async () => {
    try {
        const response = await axios.get(`${baseURL}/v1/bibles`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return error;
    }
}
const getBooks = async (bibleId) => {
    try{
        console.log(bibleId);
        const response = await axios.get(`${baseURL}/v1/bibles/${bibleId}/books`, headers);
        return response.data;
    } catch(error){
        console.error("Error fetch data: " , error);
        return error;
    }
}

module.exports = {
    getBibles,
    getBooks,
}