import { createContext, useContext, useReducer } from 'react';

const BibleContext = createContext();

const useBibleContext = () => {
    return useContext(BibleContext);
}

const BibleProvider = ({ children }) => {
    const initialState = {
        bibles: [],
    }
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_BIBLES':
                return { ...state, bibles: action.payload };
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