import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { max6, requiredItem } from "../../../props/validation";
import { actionCreateDataWorkspace } from "../../../redux/Workspaces/workspaces.actions";
import { RootState } from "../../../redux/store";

const CreateWorkspaces = () => {
    const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [defaultData, setDefaultData] = useState({name: ''});

  const loading = useSelector<RootState>(
    (state) => state.workspacesReducer?.loadingCreate
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    let body = {
      name: values.name,
    };
    dispatch(actionCreateDataWorkspace(body, handleCancel, () => setDefaultData({name: ''})));
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new
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
        <Form.Item
          label="Name"
          name="name"
          rules={[requiredItem, max6]}
        >
          <Input placeholder="Name"/>
        </Form.Item>

        <Form.Item >
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

export default CreateWorkspaces;
