import { Pie } from "@ant-design/plots";
import useStore from "../store/useStore";
import { useEffect } from "react";

interface UniqueCity {
  city: string;
  count: number;
}

function PieChart() {
  const { storeData, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueCities: UniqueCity[] = [];

  storeData?.forEach((item) => {
    const city = item.address.city;
    const existingCity = uniqueCities.find(
      (currentCity) => currentCity.city.toLowerCase() === city.toLowerCase()
    );
    if (existingCity) {
      existingCity.count++;
    } else {
      uniqueCities.push({ city, count: 1 });
    }
  });

  const data = uniqueCities.map((item) => {
    return {
      type: item.city,
      value: item.count,
    };
  });

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) =>
        `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Pie {...config} />
    </>
  );
}

export default PieChart;
