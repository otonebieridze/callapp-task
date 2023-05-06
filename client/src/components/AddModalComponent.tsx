import { useState, SetStateAction } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { DataItemInterface } from "../App";
import styled from "styled-components";

type AddModalComponentProps = {
  myData: DataItemInterface[];
  setMyData: React.Dispatch<SetStateAction<DataItemInterface[]>>;
};

const AddModalComponent = ({ myData, setMyData }: AddModalComponentProps) => {
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleSubmit = (values: DataItemInterface) => {
    try {
      axios.post("http://localhost:5000/api/users", values);
      setOpen(false);

      const newItem = values;
      const newId = myData[myData.length - 1].id + 1;
      newItem.id = newId;

      setMyData((prev) => [...prev, newItem]);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>

      <Modal title="Add" open={open} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "" }]}
          >
            <Form.Item
              name={["address", "street"]}
              rules={[
                {
                  required: true,
                  message: "Please enter your street",
                },
              ]}
            >
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item
              name={["address", "city"]}
              rules={[
                {
                  required: true,
                  message: "Please enter your city",
                },
              ]}
            >
              <Input placeholder="Enter your city" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default AddModalComponent;


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`