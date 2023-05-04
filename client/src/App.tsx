import { useEffect } from "react";
import useStore from "./store/useStore";
import { Table } from "antd";
import { Button } from "antd";

const App = () => {
  const { loading, data, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street: string, city: string }) => (
        <>
          <p>street: {address.street}</p>
          <p>city: {address.city}</p>
        </>
      )
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },

    {
      title: "Actions",
      render: () => {
        return (
          <>
            <Button type="link">Add</Button>
            <Button type="link">Delete</Button>
          </>
        )
      }
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table columns={columns} dataSource={data!} />
    </>
  );
};

export default App;
