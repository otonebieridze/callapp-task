import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/useStore";
import { Table, Button } from "antd";
import EditModalComponent from "./EditModalComponent";
import { DataItemInterface } from "../App";

type TableComponentProps = {
  myData: DataItemInterface[];
  setMyData: React.Dispatch<SetStateAction<DataItemInterface[]>>;
};

function TableComponent({ myData, setMyData }: TableComponentProps) {
  const { loading, storeData, error, fetchData } = useStore();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: -1,
    name: "",
    email: "",
    gender: "",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setMyData(storeData!);
  }, [storeData]);

  const handleEdit = (record: DataItemInterface) => {
    setCurrentItem(record);
    setOpenEditModal(true);
  };

  const handleDelete = (id: number) => {
    try {
      axios.delete(`http://localhost:5000/api/users/${id}`);
      const newData = myData?.filter((item) => item.id !== id);
      setMyData(newData!);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street: string; city: string }) => (
        <>
          <p>street: {address.street}</p>
          <p>city: {address.city}</p>
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Action",
      render: (record: DataItemInterface) => {
        return (
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table
        dataSource={myData!}
        columns={columns}
        rowKey="id"
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              handleEdit(record);
            },
          };
        }}
      />

      <EditModalComponent
        myData={myData}
        setMyData={setMyData}
        open={openEditModal}
        setOpen={setOpenEditModal}
        currentItem={currentItem}
      />
    </>
  );
}

export default TableComponent;
