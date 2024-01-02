import { createContext, useContext, useReducer } from 'react';

const BibleContext = createContext();

const useBibleContext = () => {
    return useContext(BibleContext);
}

const BibleProvider = ({ children }) => {
    let bibleId = localStorage.getItem("bibleId") ?? null;
    if(bibleId === null){
        let newBibleId = 'de4e12af7f28f599-02';
        localStorage.setItem("bibleId", newBibleId);
        bibleId = newBibleId;
    }  
    const initialState = {
        bibles: [],
        currentBible: null,
        currentBibleId: bibleId,
    }

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_BIBLES':
                return { ...state, bibles: action.payload };
            case 'SET_BOOKS':
                return {...state, books: action.payload };
            default:
                return state;
        }
    }, initialState);

    return (
        <BibleContext.Provider value={{state,dispatch}}>
            {children}
        </BibleContext.Provider>
    );
}

export {
    useBibleContext,
    BibleProvider,
}