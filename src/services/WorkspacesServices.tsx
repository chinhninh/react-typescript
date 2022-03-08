import http from "../Api/http-common";
import WokspaceData from "../interface/Workspace";
const Workspaces = () => {
  return http.get("workspaces");
};
const WorkspacesCreate = (body: WokspaceData) => {
  return http.post<WokspaceData>("workspaces", body);
};
const WorkspacesSelect = (id: string) => {
  return http.post(`workspaces/${id}/select`, {});
};
const WorkspacesApplicationList = (id: string) => {
  return http.get(`workspaces/${id}/applications`);
};
const WorkspacesServices = {
  Workspaces,
  WorkspacesCreate,
  WorkspacesSelect,
  WorkspacesApplicationList,
};
export default WorkspacesServices;
