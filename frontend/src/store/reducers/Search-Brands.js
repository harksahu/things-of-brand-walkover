import * as actionTypes from '../Enums.js';

const initialState = {
    isLoading: false,
    isError: false,
    isDone: false,
    data: [],
    error: null,
  };
  
  const clearSearchBrand = () => {
    return initialState;
  };

const searchBrandStart = (state) => {
    return { ...state, isLoading: +true, error: null, isError: false };
  };
  
  const searchBrandSuccess = (state, action) => {
    // console.log(action);
    return { ...state, data: action?.data || [], isDone: +true, isLoading: false };
  };
  
  const searchBrandFailure = (state, action) => {
    return { ...state, error: action.data, isLoading: false, isError: +true };
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_SEARCH_BRANDS:
        return searchBrandStart(state);
      case actionTypes.SUCCESS_SEARCH_BRANDS:
        return searchBrandSuccess(state, action);
      case actionTypes.FAIL_SEARCH_BRANDS:
        return searchBrandFailure(state, action);
      case actionTypes.CLEAR_SEARCH_BRANDS:
        return clearSearchBrand();
      default:
        return state;
    }
  };
  
  export default reducer;