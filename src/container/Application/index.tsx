import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetListWorkspaceApplication } from "../../redux/Workspaces/workspaces.actions";
import { RootState } from "../../redux/store";
import HeaderContent from "../../props/HeaderContent";
import { getWorkspaceId } from "../../redux/localStorage";
import {APPLICATION_STORES_PATH} from "../../routers/path"
import { useNavigate, Navigate } from "react-router-dom";


const Application = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector<RootState>(
    (state) => state.workspacesReducer?.dataApplication
  ) as any;
  const loading = useSelector<RootState>(
    (state) => state.workspacesReducer?.loading
  ) as any;
  useEffect(() => {
    let workspaceId = getWorkspaceId() || "";
    if (workspaceId) {
      dispatch(actionGetListWorkspaceApplication(workspaceId));
    }
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "application_id",
      key: "application_id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ACTION",
      dataIndex: "application_id",
      key: "action",
      render: (record: string) => {
        return <Button type="primary" onClick={() => navigate(APPLICATION_STORES_PATH.replace(':id',record), {replace: false})}>View</Button>
      }
    },
  ];

  return (
    <div>
      <HeaderContent title="Application list" />
      <Table
        dataSource={data || []}
        columns={columns}
        pagination={false}
        loading={loading}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default Application;
