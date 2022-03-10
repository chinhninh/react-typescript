import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetDataListStores,
  actionGetDataStoresField,
  actionDeleteStores,
  actionGetAction,
} from "../../../redux/Stores/stores.actions";
import { RootState } from "../../../redux/store";
import HeaderContent from "../../../props/HeaderContent";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_STORES_LIST_PATH } from "../../../routers/path";
import CreateNewItemStore from "./ModalCreateNew";
import moment from 'moment'

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

  const loadingDelete = useSelector<RootState>(
    (state) => state.storesReducer?.loadingDelete
  ) as any;
  const itemIdDelete = useSelector<RootState>(
    (state) => state.storesReducer?.itemIdDelete
  ) as any;

  const dataAction = useSelector<RootState>(
    (state) => state.storesReducer?.dataAction
  ) as any;

  useEffect(() => {
    if (appId && storeId) {
      dispatch(actionGetDataStoresField(appId, storeId));
      handleGetListStore();
    }
  }, [appId]);

  const handleGetListStore = () => {
    let body = {
      per_page: 0,
      page: 1,
    };
    dispatch(actionGetDataListStores(body, appId, storeId));
    dispatch(actionGetAction(storeId));
  };

  const handleDelete = (appId: string, storesId: string, itemId: string) => {
    dispatch(actionDeleteStores(appId, storeId, itemId));
  };


  let dateInDataField = (Object.values(dataField || {}) || []).filter((e: any) => e.dataType === 'datetime') as any

  let fieldIdDateTime = dateInDataField && dateInDataField.length && dateInDataField[0].field_id

  let newColumns = [] as any;
  try {
    if (dataField) {
      newColumns = (Object.values(dataField) || []).map((e: any) => {
        return {
          title: e.name,
          dataIndex: e.field_id,
          key: e.field_id,
          width: "18%",
        };
      });

      newColumns = (newColumns || []).concat([
        {
          title: "ACTION",
          dataIndex: "i_id",
          key: "action",
          width: "35%",
          render: (record: string, val: any) => {
            return (
              <div>
                {(dataAction || []).map((e: any, i: number) => {
                  return e.operation === "new" || e.operation === "update" ? (
                    <CreateNewItemStore
                      dataField={dataField}
                      appId={appId}
                      storeId={storeId}
                      handleGetListStore={handleGetListStore}
                      operation={e.operation}
                      dataItem={val}
                      itemId={record}
                      rev_no={val.rev_no}
                      fieldIdDateTime={fieldIdDateTime}
                    />
                  ) : (
                    <Button
                      loading={
                        e.operation === "delete" &&
                        itemIdDelete === record &&
                        loadingDelete
                      }
                      type={
                        e.operation === "delete" || e.operation === "new"
                          ? "primary"
                          : e.operation === "update"
                          ? "dashed"
                          : "default"
                      }
                      danger={e.operation === "delete"}
                      onClick={() => handleDelete(appId, storeId, record)}
                      style={{ marginRight: 10, marginTop: 5 }}
                    >
                      {e.name}
                    </Button>
                  );
                })}
              </div>
            );

            // <Button loading={(itemIdDelete === record) && loadingDelete} type="primary" danger onClick={() => handleDelete(appId, storeId, record)}>Delete</Button>
          },
        },
      ]);
    }
  } catch (error) {
    console.log("err: ", error);
  }

  return (
    <div>
      <HeaderContent
        title="stores list"
        isGoBack
        extra={
          <CreateNewItemStore
            dataField={dataField}
            appId={appId}
            storeId={storeId}
            handleGetListStore={handleGetListStore}
            operation={"new"}
            dataItem={{}}
            itemId=""
            rev_no=""
            fieldIdDateTime=""
          />
        }
      />
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
