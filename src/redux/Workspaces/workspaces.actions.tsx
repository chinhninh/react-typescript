import { WORKSPACE_START, WORKSPACE_FAIL, WORKSPACE_SUCCESS, WORKSPACE_CREATE_START, WORKSPACE_CREATE_FAIL, WORKSPACE_CREATE_SUCCESS } from "./workspaces.types";

import WorkspacesServices from "../../services/Workspaces";

import WokspaceData from "../../interface/Workspace";

import { configError } from "../../props/configError";
import { message } from "antd";

import { setToken } from "../localStorage";

const actionGetDataWorkspace = () => (dispatch: any) => {
  dispatch({ type: WORKSPACE_START });
  WorkspacesServices.Workspaces()
    .then((res: any) => {
      dispatch({ type: WORKSPACE_SUCCESS, payload: res?.data });
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: WORKSPACE_FAIL, payload: e });
    });
};

const actionCreateDataWorkspace = (body: WokspaceData, handleCancel: () => void, setDefaultData: () => void) => (dispatch: any) => {
  dispatch({ type: WORKSPACE_CREATE_START });
  WorkspacesServices.WorkspacesCreate(body)
    .then((res: any) => {
      message.success("Tạo workspace thành công");
      dispatch({ type: WORKSPACE_CREATE_SUCCESS, payload: res?.data });
      dispatch(actionGetDataWorkspace())
      handleCancel()
      setDefaultData()
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: WORKSPACE_CREATE_FAIL, payload: e });
    });
};

const actionActiveWorkspace = (id: string, callList: () => void) => (dispatch: any) => {
  dispatch({ type: WORKSPACE_CREATE_START });
  WorkspacesServices.WorkspacesSelect(id)
    .then((res: any) => {
      message.success("Chọn thành công");
      dispatch({ type: WORKSPACE_CREATE_SUCCESS, payload: res?.data });
      dispatch(actionGetDataWorkspace())
      callList()
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: WORKSPACE_CREATE_FAIL, payload: e });
    });
};

export { actionGetDataWorkspace, actionCreateDataWorkspace, actionActiveWorkspace };
