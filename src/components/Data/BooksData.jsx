import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { useBibleContext } from '../BibleProvider';

const BooksData = () => {
    const [responseData, setResponseData] = useState(null);
    const {state, dispatch} = useBibleContext();
    const [loading, setLoading] = useState(false);

    const getBooks = async (bibleId) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles/${bibleId}/books`);
            const data = await response.json();
            setResponseData(JSON.stringify(data,null,2));
            return data;
        } catch (error) { 
            
        } finally{
            setLoading(false);
        }
    } 

    useEffect(()=>{
        getBooks(state.currentBibleId);
    }, [])
    return (<>
        <div>
            <h2>Bibles Books Data</h2>
            {loading ? <ClipLoader /> : 
            <JSONPretty id="bibles" data={responseData}></JSONPretty> 
            }
        </div>

    </>)
}

export default BooksData; 