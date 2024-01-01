import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const Bibles = () => {
    const [bibles, setBibles] = useState(null);
    const [loading, setLoading] = useState(false);

    const getBibles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bibles`);
            const data = await response.json();
            setBibles(data.data);
            console.log({ data })
            return data;
        } catch (error) {
            console.error("ERROR: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBibles();
    }, [])
    return (<>
        <div>
            <h2>Bibles</h2>
            {loading ? <ClipLoader /> :
                <>
                    {bibles && bibles.map(bible => {
                        return <div style={{margin:"10px"}}>
                            <h4>{bible.name}</h4>
                            <p>Language: {bible.language.name}</p>
                            <p>Description: {bible.description}</p>
                            <p>ID: {bible.id}</p>
                            <hr />
                        </div>
                    })}
                </>
            }
        </div>

    </>)
}

export default Bibles; 