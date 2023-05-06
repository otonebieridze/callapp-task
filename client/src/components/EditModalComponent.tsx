import { SetStateAction, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { DataItemInterface } from "../App";
import { useForm } from "antd/es/form/Form";
import InputMask, { InputMaskProps } from "react-input-mask";
import { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.setFieldsValue(currentItem);
  }, [currentItem]);

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
            <Input placeholder="Enter your name" />
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
            <Input placeholder="Enter your email" />
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
              placeholder="Enter your gender"
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
              <Input placeholder="City" />
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
              {
                pattern: /^\+1 \(\d{3}\) \d{3}-\d{4}$/,
                message: "Please enter valid phone number",
              },
            ]}
          >
            <InputMask
              mask="+1 (999) 999-9999"
              maskChar={null}
              placeholder="+1 (999) 999-9999"
            >
              {({ ...rest }: InputMaskProps) => (
                <Input {...rest} ref={inputRef} />
              )}
            </InputMask>
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
