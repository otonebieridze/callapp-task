import AddModalComponent from "../components/AddModalComponent";
import TableComponent from "../components/TableComponent";
import { DataItemInterface } from "../App";

type HomeProps = {
  myData: DataItemInterface[];
  setMyData: React.Dispatch<React.SetStateAction<DataItemInterface[]>>;
}

function Home({ myData, setMyData }: HomeProps) {
  return (
    <>
      <AddModalComponent myData={myData} setMyData={setMyData} />
      <TableComponent myData={myData} setMyData={setMyData} />
    </>
  )
}

export default Home;