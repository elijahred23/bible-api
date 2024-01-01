const baseURL = "https://api.scripture.api.bible";
const APIKEY = ""

const axios = require('axios')

const getBibles = async () => {
    try{
        const response = await axios.get(`${baseURL}/v1/bibles`, {
            headers: {'api-key': APIKEY}
        });
        console.log(response.data);

    } catch (error){
        console.error("Error fetching data: " , error);
    }
}

getBibles();