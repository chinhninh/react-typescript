import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { max6, requiredItem } from "../../../props/validation";
import { actionCreateNewItem, actionUpdateItem } from "../../../redux/Stores/stores.actions";
import { RootState } from "../../../redux/store";

const { Option } = Select;

interface paramCreateNewItem {
  dataField: any;
  appId: string;
  storeId: string;
  handleGetListStore: () => void;
  operation: string;
  dataItem: any,
  itemId: string,
  rev_no: string
}

const CreateNewItemStore = ({
  dataField,
  appId,
  storeId,
  handleGetListStore,
  operation,
  dataItem,
  itemId,
  rev_no
}: paramCreateNewItem) => {
  const dispatch = useDispatch();

  let newDataField = (Object.values(dataField || {}) || []).filter(
    (e: any) => e.dataType === "text" || e.dataType === "select" 
    // || e.dataType === "datetime"
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
    setDefaultData(dataItem);
  }, [operation === 'update']);

  const showModal = () => {
    setIsModalVisible(true);
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

    let arrValues = Object.entries(values || {})

    arrValues = (arrValues || []).map((e: any) => {
        return e.reduce((a: any, v: any) => {return {id: a, value: v}})
    })
    
    let bodyUpdate = {
        changes: arrValues,
        return_item_result: true,
        rev_no: parseInt(rev_no)
    }
    dispatch(
        operation === 'update' ? actionUpdateItem(
        bodyUpdate,
        appId,
        storeId,
        itemId,
        handleCancel,
        handleGetListStore
      )
      :
      actionCreateNewItem(
        body,
        appId,
        storeId,
        handleCancel,
        handleGetListStore
      )
    );
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {operation === 'update' ? "Update" : "New"}
      </Button>
      <Modal
        title="Add New Workspaces"
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
                    <Option key={j} value={k.option_id}>{k.value}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item label={e.name} name={e.field_id} key={i}>
                {/* <DatePicker /> */}
                <Input placeholder={e.name} />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewItemStore;
