import express from 'express'; 
const app = express();
import cors from 'cors';
const port = 3000;
import {getBibles, getBooks, getChapters, getChapter, answerBibleQuestion} from './bible.js';
import { ApiLoggerMiddleware } from './ApiLoggerMiddleware.js';
// import {generateResponse} from './chatGPT.js';

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
    res.header('Access-Control-Allow-Headers', 'Contenty-Type');
    next();
});

app.use(ApiLoggerMiddleware);

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

app.get('/bible/question', async (req,res)=>{
    let bibleContent = req.query.bibleContent;
    let question = req.query.question;

    if(!bibleContent || !question){
        res.send("Add bibleContent or question as query param", 401);
        return ;
    }
    let response = await answerBibleQuestion(bibleContent, question);
    res.send(response);
})


app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`);
})