import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import {setBibles} from './BibleReducers';
import { useBibleContext } from './BibleProvider';

const apiURL = `http://${window.location.hostname}:3000`;
console.log({apiURL})
const Bibles = () => {
    const [loading, setLoading] = useState(false);
    const {state,dispatch} = useBibleContext();

    const getBibles = async () => {
        if(state.bibles.length !== 0)
        return;
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/bibles`);
            const data = await response.json();
            dispatch(setBibles(data.data));
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
                    {state.bibles && state.bibles.map(bible => {
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