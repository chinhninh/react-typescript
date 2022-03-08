import http from "../Api/http-common";
import WokspaceData from "../interface/Workspace";
const Workspaces = () => {
  return http.get("workspaces");
};
const WorkspacesCreate = (body: WokspaceData) => {
  return http.post<WokspaceData>("workspaces", body);
};
const WorkspacesSelect = (id: string) => {
  return http.post<WokspaceData>(`workspaces/${id}/select`, {});
};
const WorkspacesServices = {
  Workspaces,
  WorkspacesCreate,
  WorkspacesSelect
};
export default WorkspacesServices;
