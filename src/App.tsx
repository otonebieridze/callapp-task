import { useEffect, useState } from "react";
import useStore from "./store/useStore";
import { Table } from "antd";
import { Button } from "antd";

const App = () => {
  const { loading, data, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, []);

  const [columns, setColumns] = useState([
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
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
  ]);

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
