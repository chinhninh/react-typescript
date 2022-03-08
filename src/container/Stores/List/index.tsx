import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetDataListStores,
  actionGetDataStoresField,
} from "../../../redux/Stores/stores.actions";
import { RootState } from "../../../redux/store";
import HeaderContent from "../../../props/HeaderContent";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_STORES_LIST_PATH } from "../../../routers/path";

const StoresListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let appId = location.pathname.split("/")[3];
  let storeId = location.pathname.split("/")[4];
  const dataField = useSelector<RootState>(
    (state) => state.storesReducer?.dataField?.fields
  ) as any;
  const data = useSelector<RootState>(
    (state) => state.storesReducer?.dataList?.items
  ) as any;
  const loading = useSelector<RootState>(
    (state) => state.storesReducer?.loadingList
  ) as any;
  useEffect(() => {
    let body = {
      per_page: 0,
      page: 1,
    };
    if (appId && storeId) {
      dispatch(actionGetDataStoresField(appId, storeId));
      dispatch(actionGetDataListStores(body, appId, storeId));
    }
  }, [appId]);

  let newColumns;
  try {
    newColumns = (Object.values(dataField) || []).map((e: any) => {
      return {
        title: e.name,
        dataIndex: e.field_id,
        key: e.field_id,
      };
    });
  } catch (error) {
    console.log("err: ", error);
  }

  return (
    <div>
      <HeaderContent title="stores list" isGoBack/>
      <Table
        dataSource={data || []}
        columns={newColumns}
        pagination={false}
        loading={loading}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default StoresListPage;
