import dotenv from 'dotenv';
import axios from 'axios';
import { logger } from './logger.js';
import path from 'path';
import { generateResponse } from './chatGPT.js';
import { generateGeminiResponse } from './gemini.js';

dotenv.config();

const baseURL = "https://api.scripture.api.bible";

const getAPIKey = () => {
    return new Promise((resolve, reject) => {
        let apiKey = "d2bef96c3a068f1fff57e2b1605ed303";
        if (apiKey === null || apiKey === undefined) {
            resolve(null);
        } else {
            resolve(apiKey);
        }
    });
}

const getHeaders = async () => {
    let apiKey = await getAPIKey();
    let headers = {
        'api-key': apiKey,
        'Content-Type': 'application/json'
    }
    return headers;
}

const logAPIKEY = async () => {
    let APIKEY = await getAPIKey();
    logger.info(`processAPIKEY: ${APIKEY}`);
}

const makeRequest = async (url) => {
    try {
        let headers = await getHeaders();
        const response = await axios.get(url, { headers });
        return response;
    } catch (error) {
        logger.error(`Error fetching data from ${url}:`);
    }
}

const getBibles = async () => {
    let response = await makeRequest(`${baseURL}/v1/bibles`);
    return response.data;
}

const getBooks = async (bibleId) => {
    let response  = await makeRequest(`${baseURL}/v1/bibles/${bibleId}/books`);
    return response.data; 
}

const getChapters = async (bibleId, bookId) => {
    let response = await makeRequest(`${baseURL}/v1/bibles/${bibleId}/books/${bookId}/chapters`);
    return response.data;
}

const getChapter = async (bibleId, chapterId) => {
    let response = await makeRequest(`${baseURL}/v1/bibles/${bibleId}/chapters/${chapterId}`);
    return response.data; 
}
const getAudioBibles = async () => {
    let response = await makeRequest(`${baseURL}/v1/audio-bibles`);  
    return response; 
}
const answerBibleQuestion = async (bibleContent, question) => {
    let bibleQuestion = `You are a helpful assistant who can answer any question related to the bible. You believe it with your heart. Here is the bible content: ${bibleContent}. Here is the question: ${question}`
    console.log({bibleQuestion})
    let response = await generateGeminiResponse(bibleQuestion)
    return response;
}

export { getBibles, getBooks, getChapter, getChapters, logAPIKEY, answerBibleQuestion, getAudioBibles };
