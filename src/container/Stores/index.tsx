import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDataStores } from "../../redux/Stores/stores.actions";
import { RootState } from "../../redux/store";
import HeaderContent from "../../props/HeaderContent";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_STORES_LIST_PATH } from "../../routers/path";

const StoresPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  let appId = location.pathname.split("/")[3];
  const data = useSelector<RootState>(
    (state) => state.storesReducer?.data
  ) as any;
  const loading = useSelector<RootState>(
    (state) => state.storesReducer?.loading
  ) as any;
  useEffect(() => {
    if (appId) {
      dispatch(actionGetDataStores(appId));
    }
  }, [appId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "datastore_id",
      key: "datastore_id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ACTION",
      dataIndex: "datastore_id",
      key: "action",
      render: (record: string) => {
        return <Button type="primary" onClick={() => navigate(APPLICATION_STORES_LIST_PATH.replace(':id',appId).replace(':idStore',record), {replace: false})}>View</Button>
      }
    },
  ];

  return (
    <div>
      <HeaderContent title="Database list" isGoBack/>
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

export default StoresPage;
