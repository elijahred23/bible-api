import dotenv from 'dotenv';
import axios from 'axios';
import { logger } from './logger.js';
import path from 'path';
import { generateResponse } from './chatGPT.js';

dotenv.config();

const baseURL = "https://api.scripture.api.bible";

const getAPIKey = () => {
    return new Promise((resolve, reject) => {
        let apiKey = "";
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
    console.log({ headers, apiKey });
    return headers;
}

const logAPIKEY = async () => {
    let APIKEY = await getAPIKey();
    logger.info(`processAPIKEY: ${APIKEY}`);
}

const makeRequest = async (url) => {
    try {
        let headers = await getHeaders();
        console.log({ headers })
        let apiKey = await getAPIKey();
        console.log({ apiKey })
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        logger.error(`Error fetching data from ${url}:`);
    }
}

const getBibles = () => {
    return makeRequest(`${baseURL}/v1/bibles`);
}

const getBooks = (bibleId) => {
    return makeRequest(`${baseURL}/v1/bibles/${bibleId}/books`);
}

const getChapters = (bibleId, bookId) => {
    return makeRequest(`${baseURL}/v1/bibles/${bibleId}/books/${bookId}/chapters`);
}

const getChapter = (bibleId, chapterId) => {
    return makeRequest(`${baseURL}/v1/bibles/${bibleId}/chapters/${chapterId}`);
}
const answerBibleQuestion = async (bibleContent, question) => {
    let response = await generateResponse('You are a helpful assistant who can answer any question related to the bible. You believe it with your heart.',
        `Here is the bible content: ${bibleContent}. Here is the question ${question}`)
    return response;
}

export { getBibles, getBooks, getChapter, getChapters, logAPIKEY, answerBibleQuestion };
