import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api/coins";
import Price from "./Price";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["chartOhlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((data) => ({
                  x: data.time_open,
                  y: [
                    data.open.toFixed(2),
                    data.high.toFixed(2),
                    data.low.toFixed(2),
                    data.close.toFixed(2),
                  ],
                })),
              },
            ] as unknown as number[]
          }
          options={{
            theme: { mode: "dark" },
            chart: { height: "300", width: "500", background: "transparent" },
            xaxis: { type: "datetime" },
            yaxis: { tooltip: { enabled: true } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
