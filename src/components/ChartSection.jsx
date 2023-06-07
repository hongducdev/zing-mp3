/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import _ from "lodash";
import { Link } from "react-router-dom";
import path from "../utils/path";

const ChartSection = () => {
  const { chart, rank } = useSelector((state) => state.app);

  const [data, setData] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    left: 0,
    top: 0,
  });
  const [selected, setSelected] = useState(null);
  const chartRef = useRef(null);

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
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chart || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) {
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
              return;
            }
            const counters = [];
            for (let i = 0; i < 3; i++) {
              counters.push({
                data: chart?.items[Object.keys(chart?.items)[i]]
                  ?.filter((i) => +i.hour % 2 === 0)
                  ?.map((item) => item.counter),
                encodeId: Object.keys(chart?.items)[i],
              });
            }

            const rs = counters.find((i) =>
              i.data.some(
                (n) => n === +tooltip.body[0].lines[0].replace(",", "")
              )
            );
            setSelected(rs?.encodeId);

            const newTooltipData = {
              opacity: 1,
              left: tooltip.caretX,
              top: tooltip.caretY,
            };

            if (!_.isEqual(tooltipState, newTooltipData)) {
              setTooltipState(newTooltipData);
            }
          }
        },
      },
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
        <div className="flex gap-7 flex-col-reverse min-[1200px]:flex-row">
          <div className="flex-4 flex flex-col w-full gap-[10px]">
            {rank
              ?.filter((i, index) => index < 3)
              .map((item, index) => (
                <SongItem
                  key={item?.encodeId}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artists || []}
                  sid={item?.encodeId}
                  order={index + 1}
                  percent={Math.round((+item.score * 100) / +chart?.totalScore)}
                />
              ))}
            <div className="mt-3 text-center">
              <Link
                to={path.ZINGCHART}
                className="text-white text-sm border border-white rounded-full px-6 py-2"
              >
                Xem thêm
              </Link>
            </div>
          </div>
          <div className="flex-6 h-full relative">
            {data && <Line data={data} options={options} ref={chartRef} />}
            <div
              className="tooltip"
              style={{
                opacity: tooltipState.opacity,
                left: tooltipState.left,
                top: tooltipState.top,
                position: "absolute",
              }}
            >
              <div
                className={`flex items-center justify-between gap-1 max-w-[200px] p-1 rounded
                ${
                  chart && chart.items
                    ? selected === Object.keys(chart.items)[0]
                      ? "bg-[#4a90e2]"
                      : selected === Object.keys(chart.items)[1]
                      ? "bg-[#27bd9c]"
                      : "bg-[#e35050]"
                    : ""
                }
                `}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={rank?.find((i) => i?.encodeId === selected)?.thumbnail}
                    alt=""
                    className="w-10 rounded"
                  />
                  <div className="max-w-[80px] ">
                    <h3 className="text-white text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {rank?.find((i) => i?.encodeId === selected)?.title}
                    </h3>
                    <p className="text-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {
                        rank?.find((i) => i?.encodeId === selected)
                          ?.artistsNames
                      }
                    </p>
                  </div>
                </div>
                <span className="text-white text-sm font-semibold">
                  {Math.round(
                    (rank?.find((i) => i?.encodeId === selected)?.score * 100) /
                      +chart?.totalScore
                  ) + "%"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
