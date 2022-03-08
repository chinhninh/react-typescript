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
const StoresServices = {
  StoresData,
  StoresDataList,
  StoresDataField
};
export default StoresServices;
