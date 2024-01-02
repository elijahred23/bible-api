import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { useBibleContext } from '../BibleProvider';

const ChaptersData = () => {
    const [responseData, setResponseData] = useState(null);
    const {state, dispatch} = useBibleContext();
    const [loading, setLoading] = useState(false);

    const getChapter = async (bibleId, bookId) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles/${bibleId}/books/${bookId}/chapters`);
            const data = await response.json();
            setResponseData(JSON.stringify(data,null,2));
            return data;
        } catch (error) {
            console.error("ERROR: ", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        getChapter(state.currentBibleId, "GEN" );
    }, [])
    return (<>
        <div>
            <h2>Chapters Data</h2>
            {loading ? <ClipLoader /> : 
            <JSONPretty id="chapters" data={responseData}></JSONPretty> 
            }
        </div>

    </>)
}

export default ChaptersData; 