const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const {getBibles} = require('./bible') 

app.use(cors({origin:"*"}));

app.get('/', (req,res)=>{
    res.send("HELLO WORLD, THIS IS YOUR BIBLES API")
});

app.get('/bibles', async (req,res)=>{
    let bibles = await getBibles();
    res.send(bibles);
})

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`);
})