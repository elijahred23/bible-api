const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

let generateResponse = async (prompt) => {
    const newConfig = {
        api_key: process.env.OPEN_AI_API_KEY
    };
    const openai = new OpenAIApi(newConfig);


    const messageList = []; 
    messageList.push({ role: "user", content: prompt });

    try {
        const GPTOutput = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messageList,
        });

        const output_text = GPTOutput.data.choices[0].message.content;
        console.log(output_text);
        return output_text;

    } catch (err) {
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }
    }
};


module.exports = {
    generateResponse
}