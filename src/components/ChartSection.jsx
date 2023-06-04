/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const ChartSection = () => {
  const { chart, rank } = useSelector((state) => state.app);
  console.log("🚀 ~ ChartSection ~ rank:", rank);
  const [data, setData] = useState(null);
  const options = {
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((i) => +i.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#27bd9c" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#27bd9c" : "#e35050",
          pointHoverBorderWidth: 5,
        });
      }
      setData({ labels, datasets });
    }
  }, [chart]);

  return (
    <div className="px-[59px] mt-12">
      <div className="bg-[#41185e] p-5 rounded-lg flex flex-col gap-5 h-full">
        <h3 className="text-3xl font-bold text-white">#zingchart</h3>
        <div className="flex gap-7 flex-grow">
          <div className="flex-4 flex flex-col w-full gap-[10px]">
            {rank
              ?.filter((i, index) => index < 3)
              .map((item, index) => (
                <SongItem
                  key={item?.encodeId}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames || []}
                  sid={item?.encodeId}
                  order={index + 1}
                  percent={Math.round((+item.score * 100) / +chart?.totalScore)}
                />
              ))}
          </div>
          <div className="flex-6 h-full">
            {data && <Line data={data} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
