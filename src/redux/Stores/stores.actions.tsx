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
  STORES_DELETE_FAIL,
  STORES_DELETE_SUCCESS,
  STORES_DELETE_START,
  STORES_GET_ACTION_START,
  STORES_GET_ACTION_SUCCESS,
  STORES_GET_ACTION_FAIL,
  STORES_CREATE_ITEM_START,
  STORES_CREATE_ITEM_SUCCESS,
  STORES_CREATE_ITEM_FAIL,
} from "./stores.types";

import StoresServices from "../../services/StoresServices";

import { configError } from "../../props/configError";

import {StoresSearchData} from "../../interface/StoresInterface"
import { message } from "antd";

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

const actionDeleteStores = (appId: string, storesId: string, itemId: string) => (dispatch: any) => {
  dispatch({ type: STORES_DELETE_START, payload:  itemId });
  StoresServices.StoresDelete(appId, storesId, itemId)
    .then((res: any) => {
      message.success('Delete success')
      dispatch({ type: STORES_DELETE_SUCCESS});
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_DELETE_FAIL, payload: e });
    });
};

const actionGetAction = (storesId: string) => (dispatch: any) => {
  dispatch({ type: STORES_GET_ACTION_START });
  StoresServices.StoreGetAction(storesId)
    .then((res: any) => {
      dispatch({ type: STORES_GET_ACTION_SUCCESS, payload: res?.data});
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_GET_ACTION_FAIL, payload: e });
    });
};

const actionCreateNewItem = (body: any, appId: string, storesId: string, handleCancel: () => void, handleGetListStore: () => void) => (dispatch: any) => {
  dispatch({ type: STORES_CREATE_ITEM_START });
  StoresServices.StoresCreateItem(body, appId, storesId)
    .then((res: any) => {
      message.success('Create success new item')
      dispatch({ type: STORES_CREATE_ITEM_SUCCESS});
      handleCancel()
      handleGetListStore()
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_CREATE_ITEM_FAIL, payload: e });
    });
};

const actionUpdateItem = (body: any, appId: string, storesId: string, itemId: string, handleCancel: () => void, handleGetListStore: () => void) => (dispatch: any) => {
  dispatch({ type: STORES_CREATE_ITEM_START });
  StoresServices.StoresUpdateItem(body, appId, storesId, itemId)
    .then((res: any) => {
      message.success('Update success item')
      dispatch({ type: STORES_CREATE_ITEM_SUCCESS});
      handleCancel()
      handleGetListStore()
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: STORES_CREATE_ITEM_FAIL, payload: e });
    });
};

export {
  actionGetDataStores,
  actionGetDataListStores,
  actionGetDataStoresField,
  actionDeleteStores,
  actionGetAction,
  actionCreateNewItem,
  actionUpdateItem
};
