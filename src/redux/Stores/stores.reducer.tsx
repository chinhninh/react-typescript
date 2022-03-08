import { STORES_START, STORES_FAIL, STORES_SUCCESS, STORES_LIST_START, STORES_LIST_SUCCESS, STORES_LIST_FAIL, STORES_FIELD_START, STORES_FIELD_SUCCESS, STORES_FIELD_FAIL, } from "./stores.types";

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
  loadingList: false,
  dataList: [],
  errorList: null,
  loadingField: false,
  dataField: [],
  errorField: null,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    //get list
    case STORES_START:
      return {
        ...state,
        loading: true,
      };

    case STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload,
      };

    case STORES_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

      //get list
    case STORES_LIST_START:
      return {
        ...state,
        loadingList: true,
      };

    case STORES_LIST_SUCCESS:
      return {
        ...state,
        loadingList: false,
        dataList: action?.payload,
      };

    case STORES_LIST_FAIL:
      return {
        ...state,
        loadingList: false,
        dataList: [],
        errorList: action.payload,
      };

       //get store field
    case STORES_FIELD_START:
      return {
        ...state,
        loadingField: true,
      };

    case STORES_FIELD_SUCCESS:
      return {
        ...state,
        loadingField: false,
        dataField: action?.payload,
      };

    case STORES_FIELD_FAIL:
      return {
        ...state,
        loadingField: false,
        dataField: [],
        errorField: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
