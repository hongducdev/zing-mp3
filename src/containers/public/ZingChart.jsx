/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import _ from "lodash";
import { SongItem } from "../../components";

const ZingChart = () => {

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
        grid: { color: "rgba(0,0,0,0.2)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "black" },
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
      <h3 className="text-[40px] font-bold">#zingchart</h3>
      <div className="">
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
                  {rank?.find((i) => i?.encodeId === selected)?.artistsNames}
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
      <div className="text-black flex flex-col mt-10">
        {rank
          .map((item, index) => (
            <SongItem
              key={item?.encodeId}
              thumbnail={item?.thumbnail}
              title={item?.title}
              artists={item?.artists || []}
              sid={item?.encodeId}
              order={index + 1}
              
            />
          ))}
      </div>
    </div>
  );
}

export default ZingChart