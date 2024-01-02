import { useState, useEffect } from 'react';
import { setBooks, setChapters } from './BibleReducers';
import { useBibleContext } from './BibleProvider';
import { ClipLoader } from 'react-spinners';

const Bible = () => {
    const { state, dispatch } = useBibleContext();
    const [loading, setLoading] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState("GEN");
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [chapter, setChapter] = useState(null);

    const getBooks = async (bibleId) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles/${bibleId}/books`);
            const data = await response.json();
            dispatch(setBooks(data.data));
            return data;
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const getChapters = async (bibleId) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles/${bibleId}/books/${selectedBookId}/chapters`);
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles/${bibleId}/chapters/${selectedChapterId}`);
            const data = await response.json();
            setChapter(data.data);
            return data;
        } catch (error) {
            console.error("ERROR: ", error);
        } finally {
            setLoading(false);
        }
    }
    const copyToClipboard = (text) => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(text);
        } else {
            console.warn('Clipboard API not supported'); F
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

    return (<>
        <h2>Bible</h2>
        {loading ? <ClipLoader /> : <p>
            Books: &nbsp;
            <select onChange={event => {
                setSelectedBookId(event.target.value)
            }}>
                {state.books && state.books?.map(book => {
                    return <option selected={selectedBookId === book.id} value={book.id}>{book.name}</option>
                })}
            </select>
        </p>}
        {loading ? <ClipLoader /> : <p>
            Chapters: &nbsp;
            <select onChange={event => {
                setSelectedChapterId(event.target.value);
            }}>
                {state.chapters && state.chapters?.map(chapter => {
                    return <option selected={selectedChapterId === chapter.id} value={chapter.id}>{chapter.reference}</option>
                })}
            </select>
        </p>}
        {chapter && <div>
            <button onClick={() => copyToClipboard(chapter?.content)}>Copy to Clipboard</button>
        </div>}
        {loading && chapter ? <ClipLoader /> : <p>
            <div dangerouslySetInnerHTML={{ __html: chapter?.content ?? '' }} />
        </p>}

    </>)
}


export default Bible