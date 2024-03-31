import React from 'react';
import { useState, useEffect } from 'react';
import { setBooks, setChapters } from './BibleReducers';
import { useBibleContext } from './BibleProvider';
import { ClipLoader } from 'react-spinners';
import '../App.css';

const apiURL = `http://${window.location.hostname}:3000`;

const Bible = () => {
  const { state, dispatch } = useBibleContext();
  const [loading, setLoading] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("GEN");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [bibleQuestion, setBibleQuestion] = useState("Explain simply");
  const [bibleQuestionLoading, setBibleQuestionLoading] = useState(false);
  const [bibleQuestionResponse, setBibleQuestionResponse] = useState(null);

  const getBooks = async (bibleId) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/bibles/${bibleId}/books`);
      const data = await response.json();
      dispatch(setBooks(data.data));
      return data;
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }

  const getChapters = async (bibleId) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/bibles/${bibleId}/books/${selectedBookId}/chapters`);
      const data = await response.json();
      setSelectedChapterId(data.data[0].id)
      dispatch(setChapters(data.data))
      return data;
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }

  const getChapter = async (bibleId) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/bibles/${bibleId}/chapters/${selectedChapterId}`);
      const data = await response.json();
      setChapter(data.data);
      return data;
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }

  const askBibleQuestion = async () => {
    try {
      if (bibleQuestion === '' || bibleQuestionLoading) {
        return;
      }
      setBibleQuestionLoading(true);
      let response = await fetch(`${apiURL}/bible/question?bibleContent=${encodeURIComponent(chapter?.content)}&question=${bibleQuestion}`);
      const message = await response.text();

      console.log({message})
      setBibleQuestionResponse(message);
      return message;
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setBibleQuestionLoading(false);
    }
  }

  const copyToClipboard = (text) => {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      console.warn('Clipboard API not supported');
    }
  };

  useEffect(() => {
    getBooks(state.currentBibleId);
    getChapters(state.currentBibleId);
  }, []);

  useEffect(() => {
    getChapters(state.currentBibleId);
  }, [selectedBookId]);

  useEffect(() => {
    if (selectedChapterId === null) return;
    getChapter(state.currentBibleId);
  }, [selectedChapterId]);

  return (
    <div className="bible-container">
      <h2>Bible</h2>
      {bibleQuestionLoading && <ClipLoader />}
      {bibleQuestionResponse && <div className="response-container">
        {bibleQuestionResponse}
      </div>}
      {loading ? <ClipLoader /> :
        <p>
          Books: &nbsp;
          <select className="select-dropdown" onChange={event => {
            setSelectedBookId(event.target.value)
          }}>
            {state.books && state.books?.map(book => {
              return <option key={book.id} selected={selectedBookId === book.id} value={book.id}>{book.name}</option>
            })}
          </select>
        </p>}
      {loading ? <ClipLoader /> :
        <p>
          Chapters: &nbsp;
          <select className="select-dropdown" onChange={event => {
            setSelectedChapterId(event.target.value);
          }}>
            {state.chapters && state.chapters?.map(chapter => {
              return <option key={chapter.id} selected={selectedChapterId === chapter.id} value={chapter.id}>{chapter.reference}</option>
            })}
          </select>
        </p>}
      {chapter && <div>
        <button className="copy-button" onClick={() => copyToClipboard(chapter?.content)}><span>Copy to Clipboard</span></button>
      </div>}
      {!bibleQuestionLoading && chapter && <div>
        Ask Question About Chapter: &nbsp;
        <input onKeyDown={event=>{
          if(event.key === "enter"){
            askBibleQuestion();
          }
        }} className="question-input" onChange={event => {
          setBibleQuestion(event.target.value);
        }} value={bibleQuestion} type="text" />
        <button className="ask-button" onClick={askBibleQuestion}>Ask</button>
      </div>}
      {loading && chapter ? <ClipLoader /> :
        <p>
          <div className="chapter-content" dangerouslySetInnerHTML={{ __html: chapter?.content ?? '' }} />
        </p>}
    </div>
  )
}

export default Bible;
