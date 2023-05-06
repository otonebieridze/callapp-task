import { SetStateAction, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { DataItemInterface } from "../App";
import { useForm } from "antd/es/form/Form";

type EditModalComponentProps = {
  myData: DataItemInterface[];
  setMyData: React.Dispatch<SetStateAction<DataItemInterface[]>>;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  currentItem: DataItemInterface;
};

const EditModalComponent = ({
  setMyData,
  open,
  setOpen,
  currentItem,
}: EditModalComponentProps) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(currentItem)
  }, [currentItem])

  const handleSubmit = (values: DataItemInterface) => {
    try {
      axios.put(`http://localhost:5000/api/users/${currentItem.id}`, values);

      setMyData((prev) => {
        return prev.map((item) => {
          if (item.id === currentItem.id) {
            const newItem = values;
            newItem.id = currentItem.id;
            return values;
          } else {
            return item;
          }
        });
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal title="Edit" open={open} onCancel={handleCancel} footer={null}>
        <Form form={form} initialValues={currentItem} onFinish={handleSubmit}>
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
    </>
  );
};

export default EditModalComponent;
