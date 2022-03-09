import {
  STORES_START,
  STORES_FAIL,
  STORES_SUCCESS,
  STORES_LIST_START,
  STORES_LIST_SUCCESS,
  STORES_LIST_FAIL,
  STORES_FIELD_START,
  STORES_FIELD_SUCCESS,
  STORES_FIELD_FAIL,
  STORES_DELETE_FAIL,
  STORES_DELETE_SUCCESS,
  STORES_DELETE_START,
  STORES_GET_ACTION_START,
  STORES_GET_ACTION_SUCCESS,
  STORES_GET_ACTION_FAIL,
  STORES_CREATE_ITEM_FAIL,
  STORES_CREATE_ITEM_SUCCESS,
  STORES_CREATE_ITEM_START,
} from "./stores.types";

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

  loadingDelete: false,
  itemIdDelete: null,
  errorDelete: null,

  loadingAction: false,
  dataAction: [],
  errorAction: null,

  loadingCreateItem: false,
  errorCreateItem: null,
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

    //delete store
    case STORES_DELETE_START:
      return {
        ...state,
        loadingDelete: true,
        itemIdDelete: action?.payload,
      };

    case STORES_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        itemIdDelete: null,
      };

    case STORES_DELETE_FAIL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        itemIdDelete: null,
      };

    //get store action
    case STORES_GET_ACTION_START:
      return {
        ...state,
        loadingAction: true,
      };

    case STORES_GET_ACTION_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        dataAction: action?.payload,
      };

    case STORES_GET_ACTION_FAIL:
      return {
        ...state,
        loadingAction: false,
        dataAction: [],
        errorAction: action.payload,
      };

    //get store action
    case STORES_CREATE_ITEM_START:
      return {
        ...state,
        loadingCreateItem: true,
      };

    case STORES_CREATE_ITEM_SUCCESS:
      return {
        ...state,
        loadingCreateItem: false,
      };

    case STORES_CREATE_ITEM_FAIL:
      return {
        ...state,
        loadingCreateItem: false,
        errorCreateItem: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
