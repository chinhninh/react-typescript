import http from "../Api/http-common";
import {StoresSearchData} from "../interface/StoresInterface";
const StoresData = (id: string) => {
  return http.get(`applications/${id}/datastores`);
};
const StoresDataList = (body: StoresSearchData, appId: string, storesId: string) => {
  return http.post(`applications/${appId}/datastores/${storesId}/items/search`, body);
};
const StoresDataField = (appId: string, storesId: string) => {
  return http.get(`applications/${appId}/datastores/${storesId}/fields`);
};
const StoresDelete = (appId: string, storesId: string, itemId: string) => {
  return http.delete(`applications/${appId}/datastores/${storesId}/items/delete/${itemId}`, {});
};
const StoreGetAction = (storesId: string) => {
  return http.get(`datastores/${storesId}/actions`);
};
const StoresCreateItem = (body: any, appId: string, storesId: string) => {
  return http.post(`applications/${appId}/datastores/${storesId}/items/new`, body);
};
const StoresUpdateItem = (body: any, appId: string, storesId: string, itemId: string) => {
  return http.post(`applications/${appId}/datastores/${storesId}/items/edit/${itemId}`, body);
};
const StoresServices = {
  StoresData,
  StoresDataList,
  StoresDataField,
  StoresDelete,
  StoreGetAction,
  StoresCreateItem,
  StoresUpdateItem
};
export default StoresServices;
