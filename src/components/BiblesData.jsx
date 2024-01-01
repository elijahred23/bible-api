import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const BiblesData = () => {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getBibles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles`);
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
        getBibles();
    }, [])
    return (<>
        <div>
            <h2>Bibles</h2>
            {loading ? <ClipLoader /> : 
            <JSONPretty id="bibles" data={responseData}></JSONPretty> 
            }
        </div>

    </>)
}

export default BiblesData; 