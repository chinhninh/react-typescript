import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { max6, requiredItem } from "../../../props/validation";
import {
  actionCreateNewItem,
  actionUpdateItem,
} from "../../../redux/Stores/stores.actions";
import { RootState } from "../../../redux/store";
import moment from "moment";

const { Option } = Select;

const dateFormat = "YYYY/MM/DD";
interface paramCreateNewItem {
  dataField: any;
  appId: string;
  storeId: string;
  handleGetListStore: () => void;
  operation: string;
  dataItem: any;
  itemId: string;
  rev_no: string;
  fieldIdDateTime: string;
  handleGetDetailItem: (itemId: string) => void;
  dataDetailItem?: any;
}

const CreateNewItemStore = ({
  dataField,
  appId,
  storeId,
  handleGetListStore,
  operation,
  dataItem,
  itemId,
  rev_no,
  fieldIdDateTime,
  handleGetDetailItem,
  dataDetailItem,
}: paramCreateNewItem) => {
  const dispatch = useDispatch();

  try {
    const newFieldStatus =
      dataDetailItem &&
      dataDetailItem.field_values &&
      dataDetailItem.field_values.length &&
      (dataDetailItem.field_values || []).filter(
        (e: any) => e.dataType === "status"
      );

    var valueStatus = newFieldStatus.length > 0 && newFieldStatus[0].value;
  } catch (error) {
    console.log(error);
  }

  let newDataField = (Object.values(dataField || {}) || []).filter(
    (e: any) =>
      e.dataType === "text" ||
      e.dataType === "select" ||
      e.dataType === "datetime"
  ) as any;

  let defaultDataFormDataField = {} as any;
  try {
    if (newDataField && newDataField.length) {
      for (let i = 0; i <= (newDataField || []).length; i++) {
        let objField_id = newDataField[i].field_id;
        defaultDataFormDataField = { ...defaultDataFormDataField };
        defaultDataFormDataField[objField_id] = "";
      }
    }
  } catch (error) {}

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [defaultData, setDefaultData] = useState({});

  const loading = useSelector<RootState>(
    (state) => state.storesReducer?.loadingCreateItem
  );

  useEffect(() => {
    setDefaultData(defaultDataFormDataField);
  }, [(newDataField || []).length]);

  useEffect(() => {
    if (operation === "update") {
      let newDataItem = dataItem;
      if (fieldIdDateTime) {
        newDataItem = {
          ...newDataItem,
          [fieldIdDateTime]: moment(dataItem[fieldIdDateTime]),
        };
      } else {
        newDataItem = dataItem;
      }
      setDefaultData(newDataItem);
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    if (operation === "update") {
      handleGetDetailItem(itemId);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDefaultData(defaultDataFormDataField);
  };

  const onFinish = (values: any) => {
    let body = {
      item: values,
    };

    let arrValues = Object.entries(values || {}) as any;

    arrValues = (arrValues || []).map((e: any) => {
      return e.reduce((a: any, v: any) => {
        return { id: a, value: v };
      });
    });

    let bodyUpdate = {
      changes: arrValues,
      return_item_result: true,
      rev_no: parseInt(rev_no),
    };
    dispatch(
      operation === "update"
        ? actionUpdateItem(
            bodyUpdate,
            appId,
            storeId,
            itemId,
            handleCancel,
            handleGetListStore
          )
        : actionCreateNewItem(
            body,
            appId,
            storeId,
            handleCancel,
            handleGetListStore
          )
    );
  };

  const onChangeStatus = (actionId: string) => {
    let bodyUpdate = {
      action_id: actionId,
      changes: [],
      return_item_result: true,
      rev_no: parseInt(rev_no),
    };

    dispatch(
      actionUpdateItem(
        bodyUpdate,
        appId,
        storeId,
        itemId,
        handleCancel,
        handleGetListStore
      )
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginTop: 5, marginRight: 10 }}
      >
        {operation === "update" ? "Update" : "New"}
      </Button>
      <Modal
        title={operation === "update" ? "Update item" : "Add new item"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        confirmLoading={loading ? true : false}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={defaultData}
          onFinish={onFinish}
          autoComplete="off"
        >
          {(newDataField || []).map((e: any, i: number) => {
            return e.dataType === "text" ? (
              <Form.Item label={e.name} name={e.field_id} key={i}>
                <Input placeholder={e.name} />
              </Form.Item>
            ) : e.dataType === "select" ? (
              <Form.Item label={e.name} name={e.field_id} key={i}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder={e.name}
                  optionFilterProp="children"
                >
                  {(e.options || []).map((k: any, j: number) => (
                    <Option key={j} value={k.option_id}>
                      {k.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item label={e.name} name={e.field_id} key={i}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            );
          })}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading ? true : false}
              loading={loading ? true : false}
            >
              {operation === "update" ? "Update" : "Create New"}
            </Button>
          </Form.Item>
        </Form>

        {operation === "update" &&
          dataDetailItem &&
          dataDetailItem.status_list &&
          dataDetailItem.status_list.length &&
          (dataDetailItem.status_list || []).map((e: any, i: number) => (
            <div key={i} style={{ display: "inline-block" }}>
              <span
                style={
                  valueStatus === e.status_id
                    ? { color: "black", fontWeight: "bold" }
                    : {}
                }
              >
                {e.status_name}
              </span>{" "}
              <span style={{ marginLeft: 10, marginRight: 10 }}>
                {(dataDetailItem.status_list || []).length - 1 !== i
                  ? ">>"
                  : ""}
              </span>
            </div>
          ))}

        {operation === "update" &&
          dataDetailItem &&
          dataDetailItem.status_actions &&
          dataDetailItem.status_actions.length &&
          (dataDetailItem.status_actions || []).map((e: any, i: number) => (
            <div key={i} style={{ display: "inline-block", marginTop: 10 }}>
              <Button loading={loading ? true : false} type="primary" style={{ marginRight: 10 }} onClick={() => onChangeStatus(e.action_id)}>
                {e.action_name}
              </Button>
            </div>
          ))}
      </Modal>
    </>
  );
};

export default CreateNewItemStore;
