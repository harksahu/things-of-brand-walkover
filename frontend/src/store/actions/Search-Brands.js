import * as actionTypes from '../Enums.js';
import { getProfileDetails } from '../../api/Index.js';

export const clearSearchBrand = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_BRANDS,
  };
};

export const searchBrand = (payload) => {
  return (dispatch) => {
    dispatch(searchBrandInitiate());
    getProfileDetails(payload)

      .then((response) => {
        dispatch(searchBrandSuccess(response?.data?.data));
      })

      .catch((error) => {
        dispatch(searchBrandFailure(error));
      });
  };
};

const searchBrandInitiate = () => {
  return {
    type: actionTypes.GET_SEARCH_BRANDS,
  };
};

const searchBrandSuccess = (data) => {
  return {
    type: actionTypes.SUCCESS_SEARCH_BRANDS,
    data: data,
  };
};

const searchBrandFailure = (err) => {
  return {
    type: actionTypes.FAIL_SEARCH_BRANDS,
    data: err,
  };
};