import {
  STORES_START,
  STORES_FAIL,
  STORES_SUCCESS,
  STORES_LIST_FAIL,
  STORES_LIST_SUCCESS,
  STORES_LIST_START,
  STORES_FIELD_START,
  STORES_FIELD_FAIL,
  STORES_FIELD_SUCCESS,
} from "./stores.types";

import StoresServices from "../../services/StoresServices";

import { configError } from "../../props/configError";

import {StoresSearchData} from "../../interface/StoresInterface"

const actionGetDataStores = (id: string) => (dispatch: any) => {
  dispatch({ type: STORES_START });
  StoresServices.StoresData(id)
    .then((res: any) => {
      dispatch({ type: STORES_SUCCESS, payload: res?.data });
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_FAIL, payload: e });
    });
};

const actionGetDataListStores = (body: StoresSearchData, appId: string, storesId: string) => (dispatch: any) => {
  dispatch({ type: STORES_LIST_START });
  StoresServices.StoresDataList(body, appId, storesId)
    .then((res: any) => {
      dispatch({ type: STORES_LIST_SUCCESS, payload: res?.data });
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_LIST_FAIL, payload: e });
    });
};

const actionGetDataStoresField = (appId: string, storesId: string) => (dispatch: any) => {
  dispatch({ type: STORES_FIELD_START });
  StoresServices.StoresDataField(appId, storesId)
    .then((res: any) => {
      dispatch({ type: STORES_FIELD_SUCCESS, payload: res?.data });
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_FIELD_FAIL, payload: e });
    });
};

export {
  actionGetDataStores,
  actionGetDataListStores,
  actionGetDataStoresField
};
