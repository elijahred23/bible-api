export const setBibles = (bibles) => {
    return {
        type: 'SET_BIBLES',
        payload: bibles
    }
};
export const setBooks = (books) => {
    return {
        type: 'SET_BOOKS',
        payload: books
    }
}
export const setChapters = (chapters) => {
    return {
        type:'SET_CHAPTERS',
        payload: chapters
    }
}