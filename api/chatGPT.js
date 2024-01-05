import OpenAI from "openai"; 
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
    apiKey: ''
});

export const generateResponse = async (systemContent, prompt) => {
    const completion = await openai.chat.completions.create({
        messages:[{role:'system', content: systemContent},
    {role:'user', content:prompt}],
        model: 'gpt-3.5-turbo',
    });
    let response = completion.choices[0];
    return response;
};
