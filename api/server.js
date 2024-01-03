const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const {getBibles, getBooks, getChapters, getChapter} = require('./bible');
const {generateResponse} = require('./chatGPT')

app.use(cors({origin:"*"}));

app.get('/', (req,res)=>{
    res.send("HELLO WORLD, THIS IS YOUR BIBLES API")
});

app.get('/bibles', async (req,res)=>{
    let bibles = await getBibles();
    res.send(bibles);
})
app.get('/bibles/:bibleId/books', async (req,res)=>{
    let bibleId = req.params.bibleId;
    if(!bibleId){
        res.send("NEED BIBLE ID");
    }
    let bibleBooks = await getBooks(bibleId);
    res.send(bibleBooks); 
})

app.get('/bibles/:bibleId/books/:bookId/chapters', async (req,res)=>{
    let bibleId = req.params.bibleId;
    let bookId = req.params.bookId;

    let chapters = await getChapters(bibleId, bookId); 
    res.send(chapters);
})

app.get('/bibles/:bibleId/chapters/:chapterId', async (req,res)=>{
    let bibleId = req.params.bibleId;
    let chapterId = req.params.chapterId;

    let chapter = await getChapter(bibleId, chapterId);
    res.send(chapter);
});

app.get('/chatGPT/:prompt', async (req,res)=>{
    const {prompt} = req.params;
    const response = await generateResponse(prompt)
    res.send(response);
})

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`);
})