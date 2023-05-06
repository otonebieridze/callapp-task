import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PieChart from "./pages/PieChart";
import Header from "./components/Header";
import useStore from "./store/useStore";
import "./App.css";

export interface DataItemInterface {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

const App = () => {
  const { storeData } = useStore();
  const [myData, setMyData] = useState<DataItemInterface[]>(storeData!);

  useEffect(() => {
    setMyData(storeData!)
  }, [storeData])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home myData={myData} setMyData={setMyData} />} />
        <Route path="/pie-chart" element={<PieChart />} />
      </Routes>
    </>
  );
};

export default App;
