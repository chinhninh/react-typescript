import { WORKSPACE_START, WORKSPACE_FAIL, WORKSPACE_SUCCESS, WORKSPACE_CREATE_START, WORKSPACE_CREATE_FAIL, WORKSPACE_CREATE_SUCCESS, WORKSPACE_APPLICATION_FAIL, WORKSPACE_APPLICATION_SUCCESS, WORKSPACE_APPLICATION_START } from "./workspaces.types";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: null,
  loadingCreate: false,
  dataCreate: null,
  errorCreate: null,
  loadingApplication: false,
  dataApplication: [],
  errorApplication: null,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {

    //get list
    case WORKSPACE_START:
      return {
        ...state,
        loading: true,
      };

    case WORKSPACE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload,
      };

    case WORKSPACE_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };

      //create

      case WORKSPACE_CREATE_START:
      return {
        ...state,
        loadingCreate: true,
      };

    case WORKSPACE_CREATE_SUCCESS:
      return {
        ...state,
        loadingCreate: false,
        dataCreate: action?.payload,
      };

    case WORKSPACE_CREATE_FAIL:
      return {
        ...state,
        loadingCreate: false,
        dataCreate: null,
        errorCreate: action.payload,
      };

      //application

      case WORKSPACE_APPLICATION_START:
      return {
        ...state,
        loadingApplication: true,
      };

    case WORKSPACE_APPLICATION_SUCCESS:
      return {
        ...state,
        loadingApplication: false,
        dataApplication: action?.payload,
      };

    case WORKSPACE_APPLICATION_FAIL:
      return {
        ...state,
        loadingApplication: false,
        dataApplication: [],
        errorApplication: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
