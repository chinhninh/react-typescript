import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDataWorkspace, actionActiveWorkspace } from "../../redux/Workspaces/workspaces.actions";
import { RootState } from "../../redux/store";
import HeaderContent from "../../props/HeaderContent";
import CreateWorkspaces from "./CreateWorkspaces";

const Workspaces = () => {
  const dispatch = useDispatch();
  const idActived = useSelector<RootState>(
    (state) => state.workspacesReducer?.data.current_workspace_id
  );
  const data = useSelector<RootState>(
    (state) => state.workspacesReducer?.data.workspaces
  ) as any;
  const loading = useSelector<RootState>(
    (state) => state.workspacesReducer?.loading
  ) as any;

  useEffect(() => {
    dispatch(actionGetDataWorkspace());
  }, []);

  const handleActiveWorkspace = (id: string) => {
    dispatch(actionActiveWorkspace(id, () => dispatch(actionGetDataWorkspace())))
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "workspace_id",
      key: "workspace_id",
    },
    {
      title: "NAME",
      dataIndex: "workspace_name",
      key: "workspace_name",
    },
    {
      title: "Status",
      dataIndex: "idActived",
      key: "idActived",
      render: (record: string, val: {workspace_id: string, workspace_name: string}) => {
        let isActive = (idActived === val.workspace_id) ? true : false
        let color = isActive ? "#76ff03" : "#ff7043"
        let textStatus = isActive ? "Actived" : "Not Actived"
        return <div>
          <Tag color={color}>{textStatus}</Tag>
        </div>
      }
    },
    {
      title: "Action",
      dataIndex: "workspace_id",
      key: "action",
      render: (record: string, val: {workspace_id: string, workspace_name: string}) => {
        let isActive = (idActived === val.workspace_id) ? true : false
        return <div>
          {!isActive && <Button type="primary" onClick={() => handleActiveWorkspace(record)}>Select</Button>}
        </div>
      }
    },
  ];

  return (
    <div>
      <HeaderContent
        title="Workspaces list"
        extra={<CreateWorkspaces/>}
      />
      <Table dataSource={data || []} columns={columns} pagination={false} loading={loading} scroll={{x: 1000}}/>
    </div>
  );
};

export default Workspaces;
